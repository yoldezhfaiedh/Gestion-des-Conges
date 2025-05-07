
import React, { useEffect, useState } from 'react';
import {
  Tab,
  Card,
  Typography,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  InputAdornment,
  Box,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Magnify } from 'mdi-material-ui';

interface Presence {
  User: string;
  _id: string;
  Mois: Date;
  NombrePresence: number;
}

function SaisiePresence() {
  const [value, setValue] = useState<string>('1');
  const [presence, setPresence] = useState<Presence[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [openHistoriqueDialog, setOpenHistoriqueDialog] = useState<boolean>(false);
  const [historiquePresence, setHistoriquePresence] = useState<Presence[]>([]);
  const [dialogData, setDialogData] = useState<Presence | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchPresence() {
      try {
        const response = await axios.get('http://localhost:5000/Presence');
        setPresence(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des présences:', error);
        toast.error('Erreur lors de la récupération des présences');
      }
    }

    fetchPresence();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleShowHistorique = async (user: string) => {
    setSelectedUser(user);
    setOpenHistoriqueDialog(true);
    try {
      const response = await axios.get(`http://localhost:5000/Presence/historique/${user}`);
      setHistoriquePresence(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique de présence:', error);
      toast.error("Erreur lors de la récupération de l'historique de présence.");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseHistorique = () => {
    setSelectedUser(null);
    setOpenHistoriqueDialog(false);
  };

  const handleDeleteHistorique = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Presence/${selectedUser}/${id}/delete`);
      if (response.status === 200) {
        toast.success("L'historique de présence a été supprimé avec succès.");
        setOpenHistoriqueDialog(false);
        // Recharger l'historique des présences après la suppression
        handleShowHistorique(selectedUser!);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique de présence:', error);
      toast.error('Une erreur est survenue lors de la suppression de l\'historique de présence.');
    }
  };

  const handleUpdateHistorique = (item: Presence) => {
    setDialogData(item);
  };

  const handleCloseDialog = () => {
    setDialogData(null);
  };

  const handleUpdateSubmit = async (updateData: Partial<Presence>) => {
    try {
      const response = await axios.put(`http://localhost:5000/Presence/${dialogData!._id}/update`, updateData);
      if (response.status === 200) {
        toast.success("L'historique de présence a été modifié avec succès.");
        setOpenHistoriqueDialog(false);
        // Recharger l'historique des présences après la modification
        handleShowHistorique(selectedUser!);
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'historique de présence:', error);
      toast.error('Une erreur est survenue lors de la modification de l\'historique de présence.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Filtrer les utilisateurs basés sur le terme de recherche
  const filteredUsers = presence
    .map((item) => item.User)
    .filter((user, index, self) => self.indexOf(user) === index)
    .filter((user) => user.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="navigation">
            <Tab value="1" label="Historique des présences" />
          </TabList>

          <CardContent>
            <TabPanel value="1">
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  size="small"
                  placeholder="Rechercher un employé"
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
              {filteredUsers.map((user, index) => (
                <div key={index}>
                  <Typography variant="h6">Employé: {user}</Typography>
                  <Button variant="contained" onClick={() => handleShowHistorique(user)}>
                    Historique des présences
                  </Button>
                </div>
              ))}
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>

      {/* Dialog pour l'historique des présences */}
      <Dialog open={openHistoriqueDialog} onClose={handleCloseHistorique}>
        <DialogTitle>Historique des présences de {selectedUser}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mois</TableCell>
                  <TableCell>Nombre de Présences</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historiquePresence.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(item.Mois)}</TableCell>
                    <TableCell>{item.NombrePresence}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleDeleteHistorique(item._id)}>
                        Supprimer
                      </Button>
                      <Button variant="contained" onClick={() => handleUpdateHistorique(item)}>
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseHistorique}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour la modification de l'historique de présence */}
      <Dialog open={!!dialogData} onClose={handleCloseDialog}>
        <DialogTitle>Modifier l'historique de présence</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            id="NombrePresence"
            name="NombrePresence"
            label="Nombre de Présences"
            value={dialogData?.NombrePresence}
            onChange={(e) => setDialogData({ ...dialogData!, NombrePresence: +e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            id="Mois"
            name="Mois"
            label="Mois"
            type="date"
            value={formatDate(dialogData?.Mois || '')}
            onChange={(e) => setDialogData({ ...dialogData!, Mois: new Date(e.target.value) })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Button variant="contained" onClick={handleCloseDialog}>
    Annuler
  </Button>
  <Button variant="contained" onClick={() => handleUpdateSubmit(dialogData)}>
    Enregistrer
  </Button>
</DialogActions>

      </Dialog>
    </>
  );
}

export default SaisiePresence;
