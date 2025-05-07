import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { Magnify } from 'mdi-material-ui';
import EditUtilisateur from 'src/views/InterfaceAdmin/EditUser';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

interface User {
  id: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Role: string;
  isActive: boolean;
}

const Liste_des_utilisateurs = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleBlockUnblock = async (Email: string, isActive: boolean) => {
    try {
      const response = await axios.post(
        isActive ? "http://localhost:5000/users/block" : "http://localhost:5000/users/unblock",
        { Email }
      );
      if (response.status === 201) {
        notify(" Action effectuée avec succés!");

        setUsers(prevUsers =>
          prevUsers.map(user => {
            if (user.Email === Email) {
              return { ...user, isActive: !isActive };
            }
            return user;
          })
        );
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };
  const notify = (message: string) => {
    toast(message);
  };

  const handleButtonClick = (Email: string, isActive: boolean) => {
    handleBlockUnblock(Email, isActive);
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.Email === Email) {
          return { ...user, isActive: !isActive };
        }
        return user;
      })
    );
  };

  const handleDeleteConfirmationOpen = (user: User) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (userToDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/users/${userToDelete.Email}`);
        if (response.status === 200) {
          notify(" La suppression a été effectuée avec succés!");

          setUsers(prevUsers => prevUsers.filter(user => user.Email !== userToDelete.Email));
        }
      } catch (error) {
        notify(" Erreur lors de la suppression !");

        console.error(`Erreur lors de la suppression de l'utilisateur ${userToDelete.Email}:`, error);
      }
    }
    handleDeleteConfirmationClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = Array.isArray(users) ? 
    users.filter(user => user.Nom.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  const openEditDialog = (user: User) => {
    setSelectedUserForEdit(user);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedUserForEdit(null);
  };


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
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Département</TableCell>

                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.Nom}</TableCell>
                  <TableCell>{user.Prenom}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  <TableCell>
  {user.Departement ? user.Departement.NomDepartement : ''}
</TableCell>

                  <TableCell>{user.isActive ? 'Actif' : 'Inactif'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleButtonClick(user.Email, user.isActive)}>
                      {user.isActive ? 'Bloquer' : 'Débloquer'}
                    </Button>
                    <Button onClick={() => openEditDialog(user)}>Modifier</Button>
                    <Button onClick={() => handleDeleteConfirmationOpen(user)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <EditUtilisateur open={isEditDialogOpen} handleClose={closeEditDialog} user={selectedUserForEdit} />
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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

export default Liste_des_utilisateurs;
