import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import BriefcaseVariantOutlineIcon from 'mdi-material-ui/BriefcaseVariantOutline';
import CardCongeRH from 'src/@core/components/card-statistics/CardGestionConge-Rh';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

interface DemandeConge {
  _id: string;
  User:User;
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

function GestionDesCongésManager() {
  // État pour stocker les demandes de congé
  const [demandesConge, setDemandesConge] = useState<DemandeConge[]>([]);
  const [loading, setLoading] = useState(true); // État pour gérer le chargement initial
  const [loadingAction, setLoadingAction] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState<DemandeConge | null>(null); // Ajout de la déclaration pour la demande sélectionnée
  const [openDialog, setOpenDialogMain] = useState(false); // État de la boîte de dialogue
  const [afficherCongesEnCours, setAfficherCongesEnCours] = useState(true); // État pour afficher les congés en cours uniquement
  // Effectue la requête API lors du chargement initial
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
          const response = await axios.get<DemandeConge[]>("http://localhost:5000/demandeconge/by-manager", {
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


  const convertirDate = (dateISO: string): string => {
    // Analyser la date au format ISO 8601
    const date = new Date(dateISO);
    // Extraire le jour, le mois et l'année
    const jour = date.getDate().toString().padStart(2, '0'); // Ajouter un zéro devant les jours inférieurs à 10
    const mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à partir de 0, donc nous ajoutons 1
    const annee = date.getFullYear();
    // Retourner la date au format "jj/mm/aaaa"
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

  const notify = (message: string) => {
    toast(message);
  };

  // Fonction pour valider la décision
  const handleClickValider = async (_id: string) => {
    try {
      setLoadingAction(true); // Définir loading sur true pour désactiver les boutons pendant la validation
      const token = getTokenFromCookies('token');
      if (token) {
        const response = await axios.post(`http://localhost:5000/demandeconge/accepter/${_id}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        // Mettre à jour les demandes après la validation
        console.log(response.data);
  
        const updatedDemandes = demandesConge.map(demande => {
          if (demande._id === _id) {
            return { ...demande, statut: 'Acceptée En attente de confirmation' }; // Mettre à jour le statut de la demande
          }
          return demande;
        });
        
        if (response.status === 201) {
          notify("Demande de congé acceptée En attente de confirmation.");
        } else {
          notify("Une erreur s'est produite. Veuillez réessayer.");
        }
        
        setDemandesConge(updatedDemandes); // Met à jour l'état avec les nouvelles données
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la décision :', error);
    } finally {
      setLoadingAction(false); // Remettre loading sur false une fois la validation terminée
    }
  };
  

  const handleClickInValider = async (_id: string) => {
    try {
      setLoadingAction(true); // Définir loading sur true pour désactiver les boutons pendant la validation
      const token = getTokenFromCookies('token');
      if (token) {
        const response = await axios.post(`http://localhost:5000/demandeconge/refuser/${_id}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        // Mettre à jour les demandes après la validation
        console.log(response.data);
  
      const updatedDemandes = demandesConge.map(demande => {
        if (demande._id === _id) {
          return { ...demande, statut: 'Refusée En attente de confirmation' }; // Mettre à jour le statut de la demande
        }
        return demande;
      });
      if (response.status === 201) {
        notify("Demande de congé refusér En attente de confirmation.");
      } else {
        notify("Une erreur s'est produite. Veuillez réessayer.");
      }
      
      setDemandesConge(updatedDemandes); // Met à jour l'état avec les nouvelles données
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la décision :', error);
  } finally {
    setLoadingAction(false); // Remettre loading sur false une fois la validation terminée
  }
};

  return (
    <>
      <CustomToast />
      <Button onClick={() => setAfficherCongesEnCours(!afficherCongesEnCours)}>
        {afficherCongesEnCours ? "Afficher tous les congés" : "Afficher les congés en cours uniquement"}
      </Button>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12}>
            <p>Chargement en cours...</p>
          </Grid>
        ) : demandesConge
            .filter(demande => afficherCongesEnCours ? demande.statut === 'En cours' : true)
            .map((demande, index) => (
              <Grid key={index} item xs={6}>
                <CardCongeRH
                User={demande.User.Nom}
                icon={<BriefcaseVariantOutlineIcon />}
                typeConge={demande.TypeConge.Nom}
                  color={demande.statut === 'En cours' ? 'warning' : (
                    demande.statut === 'Acceptée En attente de confirmation' || demande.statut === 'Refusée En attente de confirmation' || demande.statut === 'Traitée par le Responsable Rh' ? 'warning' : (
                      demande.statut === 'Acceptée' ? 'success' : (
                        demande.statut === 'Refusée' ? 'error' : 'primary'
                      )
                    )
                  )}
                  NomDemande={demande.NomDemande}
                  NombreJours={demande.NombreJours}
                  Date_debut={convertirDate(demande.Date_debut)}
                  Date_fin={convertirDate(demande.Date_fin)}
                  Statut={demande.statut}
                />
   <Button variant="contained" color="primary" sx={{ mt: -18, ml: 3 }} onClick={() => handleClickValider(demande._id)}  disabled={demande.statut !== 'En cours' || loadingAction}>
                Accepter
              </Button>
              <Button variant="contained" color="primary" sx={{ mt: -18, ml: 3 }} onClick={() => handleClickInValider(demande._id)}   disabled={demande.statut !== 'En cours' || loadingAction}>
                Refuser
              </Button>
              <Button
                // variant="contained"
                color="primary"
                sx={{ mt: -18, ml: 3 }}
                onClick={() => handleOpenDialog(demande)}
              >
                Afficher le fichier justificatif
              </Button>              </Grid>
            ))}
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


export default GestionDesCongésManager;
