import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Checkbox } from '@mui/material';
import { Delete, Magnify, Plus } from 'mdi-material-ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Avatar as MuiAvatar, styled } from '@mui/material';

import CustomToast from 'src/@core/components/Alerts/CustomToast';
import toast from 'react-hot-toast';

interface User {
  _id: number;
  Nom: string;
  Prenom: string;
  Email: string;
  image:string;
}

const CreateConversation = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const router = useRouter();
  const Avatar = styled(MuiAvatar)({
    width: '2.375rem',
    height: '2.375rem',
    fontSize: '1.125rem',
  });
  useEffect(() => {
    fetchData();
  }, []);
  const notify = (response: any) => {
    toast(response.message);
  };
  
  function getTokenFromCookies(cookieName: any) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) {
        return decodeURIComponent(value);
      }
    }

    return null;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter(user => user.Nom.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filteredUsers);
  };

  const handleToggleUser = (userId: number) => {
    const userToAdd = users.find(user => user._id === userId);
    if (!userToAdd) return;
    if (selectedUsers.some(user => user._id === userId)) {
      setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user._id !== userId));
    } else {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, userToAdd]);
    }
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user._id !== userId));
  };

  const handleCreateDiscussion = () => {
    setIsMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setIsMessageDialogOpen(false);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmitMessage = async () => {
    const token = getTokenFromCookies('token')
  
    const messageData = {
      messages: [
        {
          description: description
        }
      ],
      users: selectedUsers.map(user => ({ user: user._id }))
    };
  
    try {
      const response = await axios.post("http://localhost:5000/messaging", messageData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Réponse de l\'API:', response.data);
      notify(response.data)
      setIsMessageDialogOpen(false);
      setDescription('');
    } catch (error) {
      console.error('Erreur lors de la création de la discussion:', error);
    }
  };
  
  return (
    <>
    <CustomToast />
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 2 }}>
        {/* Section des utilisateurs sélectionnés */}
        <Box sx={{ minWidth: '250px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Utilisateurs sélectionnés</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {selectedUsers.map(user => (
              <Box key={user._id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar alt={user.Nom} src={`http://localhost:5000/${user.image}`} />
                <Typography>{user.Nom}</Typography>
                <IconButton onClick={() => handleRemoveUser(user._id)} aria-label="Supprimer">
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button disabled={selectedUsers.length === 0} onClick={handleCreateDiscussion} variant="contained" sx={{ mt: 2 }}>Créer Discussion</Button>
          </Box>
        </Box>

        {/* Section de la liste des utilisateurs */}
        <Box sx={{ flex: 1 }}>
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
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
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.Nom}</TableCell>
                    <TableCell>{user.Prenom}</TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.some(selectedUser => selectedUser._id === user._id)}
                        onChange={() => handleToggleUser(user._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Boîte de dialogue pour créer un message */}
      <Dialog open={isMessageDialogOpen} onClose={handleCloseMessageDialog}>
        <DialogTitle>Envoyer un Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            value={description}
            onChange={handleMessageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog}>Annuler</Button>
          <Button onClick={handleSubmitMessage} disabled={!description.trim()} color="primary">Envoyer</Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>

  );
};

export default CreateConversation;
