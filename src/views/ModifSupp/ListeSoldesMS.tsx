import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, Button } from '@mui/material';
import { Magnify } from 'mdi-material-ui';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdateDialog from './Edit'; 
interface Soldes {
  _id: string;
  Solde: number;
  Annee: string;
  User: string;
}

const ListeSoldes = () => {
  const [soldes, setSoldes] = useState<Soldes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  const [selectedSolde, setSelectedSolde] = useState<Partial<Soldes>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/solde/Allsolde');
      if (response.status === 200) {
        setSoldes(response.data);
      } else {
        console.error('Erreur lors de la récupération des soldes:', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des soldes:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdateClick = (solde: Soldes) => {
    setSelectedSolde(solde);
    setUpdateDialogOpen(true);
  };

  const handleUpdate = async (updatedData: Partial<Soldes>) => {
    try {
      const response = await axios.put(`http://localhost:5000/solde/${selectedSolde._id}/update`, updatedData);
      if (response.status === 200) {
        toast.success('Solde mis à jour avec succès.');
        setUpdateDialogOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du solde:', error);
      toast.error('Une erreur est survenue lors de la mise à jour du solde.');
    }
  };

  const handleDelete = async (user: string, soldeId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/solde/${user}/${soldeId}/delete`);
      if (response.status === 200) {
        toast.success('Solde supprimé avec succès.');
        fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du solde:', error);
      toast.error('Une erreur est survenue lors de la suppression du solde.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredSoldes = soldes.filter((solde) =>
    solde.User.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          size="small"
          placeholder="Rechercher par Employé"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Solde</TableCell>
              <TableCell>Année</TableCell>
              <TableCell>Employé</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSoldes.map((solde, index) => (
              <TableRow key={index}>
                <TableCell>{solde.Solde}</TableCell>
                <TableCell>{formatDate(solde.Annee)}</TableCell>
                <TableCell>{solde.User}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleUpdateClick(solde)}>
                    Modifier
                  </Button>
                  <Button variant="contained" onClick={() => handleDelete(solde.User, solde._id)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateDialog
        open={updateDialogOpen}
        handleClose={() => setUpdateDialogOpen(false)}
        handleUpdate={handleUpdate}
        initialData={selectedSolde}
      />
    </Container>
  );
};

export default ListeSoldes;
