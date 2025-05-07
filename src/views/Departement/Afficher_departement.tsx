import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Magnify } from 'mdi-material-ui';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import EditUserDialog from 'src/views/InterfaceAdmin/EditUser';
import EditDepartementDialog from './EditDepartement';
import toast from 'react-hot-toast';
import SupprimerManagerDialog from './DeleteManager';

interface Departement {
  _id: string;
  NomDepartement: string;
  Managers: { Email: string }[];
}

const ListeDepartement = () => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const [selectedDepartementForEdit, setSelectedDepartementForEdit] = useState<Departement | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [departementToDelete, setDepartementToDelete] = useState<Departement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Departement[]>("http://localhost:5000/Departement");
      if (response.status === 200) {
        const data = response.data;
        setDepartements(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des départements:', error);
    }
  };

  const notify = (message: string) => {
    toast(message);
  };

  const handleDeleteConfirmationOpen = (departement: Departement) => {
    setDepartementToDelete(departement);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDepartementToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (departementToDelete) {
      try {
        const response = await axios.delete(` http://localhost:5000/departement/${departementToDelete._id}?id=${departementToDelete._id}`);
        if (response.status === 200) {
          notify("La suppression a été effectuée avec succès!");
          fetchData(); // Rafraîchit les données après la suppression
        }
      } catch (error) {
        notify("Erreur lors de la suppression !");
        console.error(`Erreur lors de la suppression du département ${departementToDelete._id}:`, error);
      }
    }
    handleDeleteConfirmationClose();
  };

 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDepartements = departements.filter(departement =>
    departement.NomDepartement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditDialog = (departement: Departement) => {
    setSelectedDepartementForEdit(departement);
    setIsEditDialogOpen(true);
  };
  const openDeleteDialog = (departement: Departement) => {
    setSelectedDepartementForEdit(departement);
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedDepartementForEdit(null);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDepartementForEdit(null);
  };

  return (
    <>
      <CustomToast />
      <Container>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {/* Barre de recherche */}
            <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
              onChange={handleSearch}
            />
          </Box>
        </Box>
        <Box>
          <Box p="4" display="flex" justifyContent="space-between" marginTop="15px">
            <Typography variant="h4" fontWeight="bold">
              Liste des Départements
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Département</TableCell>
                  <TableCell>Managers</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDepartements.map((departement, index) => (
                  <TableRow key={index}>
                    <TableCell>{departement.NomDepartement}</TableCell>
                    <TableCell>
                      {departement.Managers.map((manager, mIndex) => (
                        <div key={mIndex}>{manager.Email}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => openEditDialog(departement)}>Ajouter Un Manager</Button>
                      <Button onClick={() => openDeleteDialog(departement)}>Supprimer un Manager</Button>
                      <Button onClick={() => handleDeleteConfirmationOpen(departement)}>Supprimer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce département ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmed}>Supprimer</Button>
          <Button onClick={handleDeleteConfirmationClose}>Annuler</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue de modification du département */}
      <SupprimerManagerDialog open={isDeleteDialogOpen} handleClose={closeDeleteDialog} departement={selectedDepartementForEdit} />
      <EditDepartementDialog open={isEditDialogOpen} handleClose={closeEditDialog} departement={selectedDepartementForEdit} />

    </>
  );
};

export default ListeDepartement;
