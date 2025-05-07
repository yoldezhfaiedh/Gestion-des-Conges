import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import router from 'next/router';
import EditUserDialog from './Modification';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import CardCongeRH from 'src/@core/components/card-statistics/CardGestionConge-Rh';
import BriefcaseVariantOutlineIcon from 'mdi-material-ui/BriefcaseVariantOutline';
interface DemandeConge {
  _id: string;
  userEmail: string;
  TypeConge: {
    Nom: string; // Adjusted to match the expected type
  };
  statut: string;
  NomDemande: string;
  NombreJours: number;
  Date_debut: string;
  Date_fin: string;
  image: string;
}
function AnnulationModificationConge() {
  const [demandesConge, setDemandesConge] = useState<DemandeConge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecteddemandeForEdit, setSelecteddemandeForEdit] = useState<DemandeConge | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState<DemandeConge | null>(null);
  const [openDialog, setOpenDialogMain] = useState(false);

  const getTokenFromCookies = (cookieName: string): string | null => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  useEffect(() => {
    async function fetchDemandesConge() {
      const token = getTokenFromCookies('token');
      if (token) {
        try {
          const response = await axios.get<DemandeConge[]>("http://localhost:5000/demandeconge/User", {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setDemandesConge(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des demandes de congé :', error);
        }
      } else {
        console.error('Le token est invalide ou manquant.');
      }
    }

    fetchDemandesConge();
  }, []);

  const notify = (message: string) => {
    toast(message);
  };

  const handleClickAnnuler = async (_id: string) => {
    try {
      const demandeAnnu = demandesConge.find(demande => demande._id === _id);
      if (demandeAnnu && (demandeAnnu.statut === 'Acceptée' || demandeAnnu.statut === 'Refusée')) {
        console.log("Impossible d'annuler une demande avec un statut 'Acceptée' ou 'Refusée'.");
        notify("Impossible d'annuler une demande avec un statut 'Acceptée' ou 'Refusée'.");
        return;
      }
      await axios.post(`http://localhost:5000/demandeconge/AnnulerDemande/${_id}?id=${_id}`);
      const updatedDemandes = demandesConge.map(demande => {
        if (demande._id === _id) {
          return { ...demande, statut: 'Annulée' };
        }
        return demande;
      });
      setDemandesConge(updatedDemandes);
    } catch (error) {
      console.error('Erreur lors de la validation de l annulation :', error);
    }
  };

  const convertirDate = (dateISO: string): string => {
    const date = new Date(dateISO);
    const jour = date.getDate().toString().padStart(2, '0');
    const mois = (date.getMonth() + 1).toString().padStart(2, '0');
    const annee = date.getFullYear();
    return `${jour}/${mois}/${annee}`;
  };

  const handleOpenDialog = (demande: DemandeConge) => {
    setSelectedDemande(demande);
    setOpenDialogMain(true);
  };

  const handleCloseDialog = () => {
    setSelectedDemande(null);
    setOpenDialogMain(false);
  };

  const openEditDialog = (demande: DemandeConge) => {
    setSelecteddemandeForEdit(demande);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelecteddemandeForEdit(null);
  };

  return (
    <>
      <CustomToast />
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12}>
            <p>Chargement en cours...</p>
          </Grid>
        ) : demandesConge.length === 0 ? (
          <Grid item xs={12}>
            <p>Pas de demande de congé pour le moment.</p>
          </Grid>
        ) : (
          demandesConge.map((demande, index) => (
            <Grid key={index} item xs={6}>
              <CardCongeRH
  User={demande.User.Nom}
  icon={<BriefcaseVariantOutlineIcon />}
  typeConge={demande.TypeConge.Nom}
  color={
    demande.statut === 'En cours' ? 'warning' :
      (demande.statut === 'Refusée' ? 'error' :
        (demande.statut === 'Acceptée En attente de confirmation' || demande.statut === 'Refusée En attente de confirmation' || demande.statut === 'Traitée par le Responsable RH' ? 'warning' :
          (demande.statut === 'Acceptée' ? 'success' :
            (demande.statut === 'Annulée' ? 'error' : 'primary')
          )
        )
      )
  }
  NomDemande={demande.NomDemande}
  NombreJours={demande.NombreJours}
  Date_debut={convertirDate(demande.Date_debut)}
  Date_fin={convertirDate(demande.Date_fin)}
  Statut={demande.statut}
/>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Button color="primary" sx={{ mt: -17,  mb: 20 }} onClick={() => handleOpenDialog(demande)}>
    Afficher le fichier justificatif
  </Button>
  {demande.statut === 'En cours' && (
    <Box sx={{  alignItems: 'center' }}>
      <Button  color="primary" sx={{ mt: -25 , ml:30  }} onClick={() => handleClickAnnuler(demande._id)}>
        Annuler la demande
      </Button>
      <Box sx={{ ml: 2 }}>
        <Button color="primary" sx={{ mt: -37, mr:40,}} onClick={() => openEditDialog(demande)}>
          Modifier
        </Button>
      </Box>
    </Box>
  )}
</Box>

            </Grid>
          ))
        )}
      </Grid>
      <EditUserDialog open={isEditDialogOpen} handleClose={closeEditDialog} demande={selecteddemandeForEdit  || null} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Justificatif</DialogTitle>
        <DialogContent>
          {selectedDemande && (
            <img
              src={`http://localhost:5000${selectedDemande.image}`}
              alt="Image de la demande de congé"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AnnulationModificationConge;
