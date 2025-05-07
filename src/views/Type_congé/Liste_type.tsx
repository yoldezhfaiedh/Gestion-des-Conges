import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { Magnify } from 'mdi-material-ui';
import EditUserDialog from 'src/views/InterfaceAdmin/EditUser';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

interface TypeConge {
Nom:string
}

const Liste_type = () => {
  const [TypeConge, setTypeConge] = useState<TypeConge[]>([]);
 
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [TypeCongeToDelete, setTypeCongeToDelete] = useState<TypeConge | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const notify = (message: string) => {
    toast(message);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/typeDemande");
      if (response.status === 200) {
        setTypeConge(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des Types:', error);
    }
  };

  

  const handleDeleteConfirmationOpen = (TypeConge: TypeConge) => {
    setTypeCongeToDelete(TypeConge);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setTypeCongeToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (TypeCongeToDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/typeDemande/${TypeCongeToDelete.Nom}?Nom=${TypeCongeToDelete.Nom}`);
        if (response.status === 204) {
          notify(" La suppression a été effectuée avec succés!");

          setTypeConge(prevTypeConge => prevTypeConge.filter(TypeConge => TypeConge.Nom !== TypeCongeToDelete.Nom));
        }
      } catch (error) {
        notify(" Erreur lors de la suppression !");

        console.error(`Erreur lors de la suppression de l'utilisateur ${TypeCongeToDelete.Nom}:`, error);
      }
    }
    handleDeleteConfirmationClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTypeConge = Array.isArray(TypeConge) ? 
  TypeConge.filter(TypeConge => TypeConge.Nom.toLowerCase().includes(searchTerm.toLowerCase())) : [];

 
  return (
    <>
    <CustomToast />
    <Container>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }  }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' >
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
            placeholder="Rechercher par Nom"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <Box>
        <Box p="4" display="flex" justifyContent="space-between" marginTop="15px">
          {/* <Typography variant="h4" fontWeight="bold">
            Liste des Utilisateurs
          </Typography> */}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Nom type de congé</TableCell>
              
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTypeConge.map((TypeConge, index) => (
                <TableRow key={index}>
                  <TableCell>{TypeConge.Nom}</TableCell>
                 
                  <TableCell>
                    
                    <Button onClick={() => handleDeleteConfirmationOpen(TypeConge)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce type de congé ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmed}>Supprimer</Button>
          <Button onClick={handleDeleteConfirmationClose}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>

  );
};

export default Liste_type;
