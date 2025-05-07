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
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import ListeSoldes from 'src/views/GestionPresence/affichageSolde';
import { Magnify } from 'mdi-material-ui';

interface Presence {
  User: string;
  _id: string;
  Mois: Date;
  NombrePresence: number;
}

interface FormValues {
  NombrePresence: number;
  Mois: string;
}
const notify = (message: string) => {
  toast(message);
};

function SaisiePresence() {
  const [value, setValue] = useState<string>('1');
  const [presence, setPresence] = useState<Presence[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [openHistoriqueDialog, setOpenHistoriqueDialog] = useState<boolean>(false);
  const [openSaisieDialog, setOpenSaisieDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [historiquePresence, setHistoriquePresence] = useState<Presence[]>([]);
  const [idPresence, setIdPresence] = useState<string | null>(null);
  const [lastUpdatesByUser, setLastUpdatesByUser] = useState<{ [key: string]: Presence }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Initialisation des valeurs du formulaire
  const initialValues: FormValues = {
    NombrePresence: 0,
    Mois: new Date().toISOString().split('T')[0],
  };

  useEffect(() => {
    async function fetchPresence() {
      try {
        const response = await axios.get('http://localhost:5000/Presence');
        setPresence(response.data);

        // Mettre à jour les dernières mises à jour pour chaque utilisateur
        const updatesByUser: { [key: string]: Presence } = {};
        response.data.forEach((item: Presence) => {
          if (!updatesByUser[item.User] || new Date(item.Mois) > new Date(updatesByUser[item.User].Mois)) {
            updatesByUser[item.User] = item;
          }
        });
        setLastUpdatesByUser(updatesByUser);
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

  // Filtrer les utilisateurs basés sur le terme de recherche
const filteredUsers = Object.keys(lastUpdatesByUser).filter((user) =>
  user.toLowerCase().includes(searchTerm.toLowerCase())
);

// Filtrer les présences pour ne conserver qu'une entrée par utilisateur
const uniquePresences = presence.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.User === item.User
  ))
);

const filteredPresences = uniquePresences.filter(
  (presence) => presence.User && typeof presence.User === 'string' && 
               presence.User.toLowerCase().includes(searchTerm.toLowerCase())
);
  

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`http://localhost:5000/presence/${selectedUser}`, values);
        if (response.status === 201) {
          notify('Enregistrement de la présence effectué avec succès.');

          setOpenSaisieDialog(false);
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la présence:', error);
        notify("Une erreur est survenue lors de l'enregistrement.");
      }
    },
  });

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

  const handleShowSaisie = async (user: string, id: string) => {
    setSelectedUser(user);
    setIdPresence(id);
    setOpenSaisieDialog(true);
  };

  const handleCloseSaisie = () => {
    setSelectedUser(null);
    setIdPresence(null);
    setOpenSaisieDialog(false);
  };

  const handleMiseAjour = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/solde/${selectedUser}/update`);
      if (response.status === 201) {
        notify(response.data.message);
        setOpenUpdateDialog(false);
      }
    } catch (error) {
      notify('Erreur lors de la mise à jour du solde');
      toast.error("Une erreur est survenue lors de la mise à jour du solde.");
    }
  };

  const handleShowUpdate = (user: string, id: string) => {
    setSelectedUser(user);
    setIdPresence(id);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setSelectedUser(null);
    setIdPresence(null);
    setOpenUpdateDialog(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <CustomToast />
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="navigation">
            <Tab value="1" label="Historique des présences" />
            <Tab value="2" label="Enregistrement des présences / Actualisation des soldes" />
            <Tab value="3" label="Les soldes de congés" />
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

            <TabPanel value="2">
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Dernière mise à jour de la présence</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPresences.map((lastUpdate, index) => (
                      <TableRow key={index}>
                        <TableCell>{lastUpdate.User}</TableCell>
                        <TableCell>{formatDate(lastUpdate.Mois)}</TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => handleShowUpdate(lastUpdate.User, lastUpdate._id)}>
                            Mettre à jour le solde
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleShowSaisie(lastUpdate.User, lastUpdate._id)}
                          >
                            Saisir les présences
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value="3">
              <ListeSoldes />
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>

      {/* Dialogs */}
      <Dialog open={openHistoriqueDialog} onClose={handleCloseHistorique}>
        <DialogTitle>Historique des présences de {selectedUser}</DialogTitle>
        <DialogContent>
          {historiquePresence.map((item, index) => (
            <Typography key={index}>
              {item.NombrePresence} présences pour le {formatDate(item.Mois)}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseHistorique}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSaisieDialog} onClose={handleCloseSaisie}>
        <DialogTitle>Saisie des présences pour {selectedUser}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="NombrePresence"
              name="NombrePresence"
              label="Nombre de Présence"
              value={formik.values.NombrePresence}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.NombrePresence && Boolean(formik.errors.NombrePresence)}
              helperText={formik.touched.NombrePresence && formik.errors.NombrePresence}
            />
            <TextField
              fullWidth
              margin="normal"
              id="Mois"
              name="Mois"
              label="Mois"
              type="date"
              value={formik.values.Mois}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Mois && Boolean(formik.errors.Mois)}
              helperText={formik.touched.Mois && formik.errors.Mois}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions>
              <Button onClick={handleCloseSaisie} variant="contained">
                Annuler
              </Button>
              <Button type="submit" variant="contained">
                Sauvegarder
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleCloseUpdate}>
        <DialogTitle>Mise à jour du solde pour {selectedUser}</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir mettre à jour le solde pour {selectedUser} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} variant="contained">
            Annuler
          </Button>
          <Button onClick={handleMiseAjour} variant="contained">
            Confirmer la mise à jour du solde
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SaisiePresence;

