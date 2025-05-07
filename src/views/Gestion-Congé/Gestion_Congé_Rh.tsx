import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import BriefcaseVariantOutlineIcon from 'mdi-material-ui/BriefcaseVariantOutline';
import CardCongeRH from 'src/@core/components/card-statistics/CardGestionConge-Rh';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import toast from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

interface DemandeConge {
  _id: string;
  userEmail: string;
  TypeConge: TypeConge;
  statut: string;
  NomDemande: string;
  NombreJours: number;
  Date_debut: string;
  Date_fin: string;
  image: string;
}
interface TypeConge {
  Nom: string;
}
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
}));

function GestionDesCongésRh() {
  const [openDialog, setOpenDialogMain] = useState(false); // État de la boîte de dialogue
  const [demandesConge, setDemandesConge] = useState<DemandeConge[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [selectedDemande, setSelectedDemande] = useState<DemandeConge | null>(null); // Ajout de la déclaration pour la demande sélectionnée

  const convertirDate = (dateISO: string): string => {
    const date = new Date(dateISO);
    const jour = date.getDate().toString().padStart(2, '0');
    const mois = (date.getMonth() + 1).toString().padStart(2, '0');
    const annee = date.getFullYear();
    return `${jour}/${mois}/${annee}`;
  };

  useEffect(() => {
    async function fetchDemandesConge() {
      try {
        const response = await axios.get<DemandeConge[]>("http://localhost:5000/demandeconge/EnAttente_DeConfirmation");
        setDemandesConge(response.data);
        setImgSrc(`http://localhost:5000${response.data.image}`);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes de congé :', error);
      }
    }
    fetchDemandesConge();
  }, []);

  const notify = (message: string) => {
    toast(message);
  };

  const handleOpenDialog = (demande: DemandeConge) => {
    setSelectedDemande(demande);
    setOpenDialogMain(true);
  };

  const handleCloseDialog = () => {
    setSelectedDemande(null);
    setOpenDialogMain(false);
  };
  // const token = getTokenFromCookies('token');
  // if (token) {
  //   try {
  //     const response = await axios.get('http://localhost:5000/auth/Profile', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

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
// Fonction pour valider la décision
const handleClickValider = async (_id: string) => {
  try {
    
    setLoadingAction(true); // Définir loading sur true pour désactiver les boutons pendant la validation
    const token = getTokenFromCookies('token');
    if (token) {
      const response = await axios.post(`http://localhost:5000/demandeconge/ValiderDecision/${_id}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
   
    const updatedDemandes = demandesConge.map(demande => {
      if (demande._id === _id) {
        if (demande.statut === 'Acceptée En attente de confirmation') {
          // Si le statut actuel est 'Acceptée en attente de confirmation', le nouveau statut sera 'Acceptée'
          return { ...demande, statut: 'Acceptée' };
        } else if (demande.statut === 'Refusée En attente de confirmation') {
          // Si le statut actuel est 'Refusée en attente de confirmation', le nouveau statut sera 'Refusée'
          return { ...demande, statut: 'Refusée' };
        }
      }
      return demande;
    });

    if (response.status === 201) {
      notify(response.data);
    } else {
      notify("Une erreur s'est produite. Veuillez réessayer.");
    }

    setDemandesConge(updatedDemandes);
  }} catch (error) {
    console.error('Erreur lors de la validation de la décision :', error);
  } finally {
    setLoadingAction(false); // Remettre loadingAction sur false une fois la validation terminée
  }
};

// Fonction pour invalider la décision
const handleClickInValider = async (_id: string) => {
  try {
    setLoadingAction(true); // Définir loadingAction sur true pour désactiver les boutons pendant l'invalidation
    const token = getTokenFromCookies('token');
    if (token) {
      const response = await axios.post(`http://localhost:5000/demandeconge/InvaliderDecision/${_id}`, null, {
        headers: {
          'Authorization': `Bearer ${token}` }
      });
        
      const updatedDemandes = demandesConge.map(demande => {
        if (demande.statut === 'Acceptée En attente de confirmation') {
          // Si le statut actuel est 'Acceptée en attente de confirmation', le nouveau statut sera 'Refusée'
          return { ...demande, statut: 'Refusée' };
        } else if (demande.statut === 'Refusée En attente de confirmation') {
          // Si le statut actuel est 'Refusée en attente de confirmation', le nouveau statut sera 'Acceptée'
          return { ...demande, statut: 'Acceptée' };
        }
        return demande;
      });

      if (response.status === 201) {
        notify(response.data);
      } else {
        notify("Une erreur s'est produite. Veuillez réessayer.");
      }

      setDemandesConge(updatedDemandes);
    }
  } catch (error) {
    console.error('Erreur lors de l/invalidation de la décision :', error);
  } finally {
    setLoadingAction(false); // Remettre loadingAction sur false une fois l'invalidation terminée
  }
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
                User=  {demande.User.Nom }

                icon={<BriefcaseVariantOutlineIcon />}
                typeConge={demande.TypeConge.Nom}
                color={
                  demande.statut === 'En cours'
                    ? 'warning'
                    : demande.statut === 'Acceptée En attente de confirmation' ||
                      demande.statut === 'Refusée En attente de confirmation' ||
                      demande.statut === 'Traitée par le Responsable Rh'
                    ? 'warning'
                    : demande.statut === 'Acceptée'
                    ? 'success'
                    : demande.statut === 'Refusée'
                    ? 'error'
                    : 'primary'
                }
                NomDemande={demande.NomDemande}
                NombreJours={demande.NombreJours}
                Date_debut={convertirDate(demande.Date_debut)}
                Date_fin={convertirDate(demande.Date_fin)}
                Statut={demande.statut}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: -18, ml: 3 }}
                onClick={() => handleClickValider(demande._id)}
                disabled={
                  demande.statut !== 'Acceptée En attente de confirmation' &&
                  demande.statut !== 'Refusée En attente de confirmation' ||
                  loadingAction
                }
              >
                Valider
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: -18, ml: 3 }}
                onClick={() => handleClickInValider(demande._id)}
                disabled={
                  demande.statut !== 'Acceptée En attente de confirmation' &&
                  demande.statut !== 'Refusée En attente de confirmation' ||
                  loadingAction
                }
              >
                Invalider
              </Button>

              <Button
                // variant="contained"
                color="primary"
                sx={{ mt: -18, ml: 3 }}
                onClick={() => handleOpenDialog(demande)}
              >
                Afficher le fichier justificatif
              </Button>
            </Grid>
          ))
        )}
      </Grid>

      {/* Boîte de dialogue modale pour afficher l'image */}
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

export default GestionDesCongésRh;

