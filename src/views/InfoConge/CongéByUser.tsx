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
  User: string;
  TypeConge: { Nom: string }; // TypeConge est un objet avec une propriété Nom
  statut: string;
  NomDemande: string;
  NombreJours: number;
  Date_debut: string;
  Date_fin: string;
  userEmail:string
}

function HistoriqueConges() {
  // État pour stocker les demandes de congé
  const [demandesConge, setDemandesConge] = useState<DemandeConge[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState<DemandeConge | null>(null); // Ajout de la déclaration pour la demande sélectionnée
  const [openDialog, setOpenDialogMain] = useState(false); // État de la boîte de dialogue

  // Fonction pour obtenir le token à partir des cookies
  function getTokenFromCookies(cookieName: string): string | null {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  // Effectue la requête API lors du chargement initial
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
          setDemandesConge(response.data); // Met à jour l'état avec les données obtenues
          setLoading(false); // Met à jour l'état loading après récupération des données
          setLoadingAction(false); // Remettre loadingAction sur false après avoir terminé l'action
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
  
    
  
    return (
      <>
        <CustomToast />
        <Grid container spacing={2}>
          {loading ? ( // Afficher un message de chargement tant que les données sont en cours de chargement
            <Grid item xs={12}>
              <p>Chargement en cours...</p>
            </Grid>
          ) : demandesConge.length === 0 ? ( // Afficher un message si aucune demande de congé n'existe
            <Grid item xs={12}>
              <p>Pas de demande de congé pour le moment.</p>
            </Grid>
          ) : (
            demandesConge.map((demande, index) => (
              <Grid key={index} item xs={6}>
                <CardCongeRH
                  User={demande.userEmail}
                  icon={<BriefcaseVariantOutlineIcon />}
                  typeConge={demande.TypeConge.Nom}
                  color={
                    demande.statut === 'En cours' ? 'warning' : 
                    (demande.statut === 'Acceptée En attente de confirmation' ||
                     demande.statut === 'Refusée En attente de confirmation' || 
                     demande.statut === 'Traitée par le Responsable Rh' ? 'warning' : 
                    (demande.statut === 'Acceptée' ? 'success' : 
                    (demande.statut === 'Annulée' ? 'error' : 
                    (demande.statut === 'Refusée' ? 'error' : 'primary'))))
                  }
                  
                  NomDemande={demande.NomDemande}
                  NombreJours={demande.NombreJours} // Concatène les dates de début et de fin
                  Date_debut={convertirDate(demande.Date_debut)} // Convertir la date de début au format jj/mm/aaaa
                  Date_fin={convertirDate(demande.Date_fin)} // Convertir la date de fin au format jj/mm/aaaa
                  Statut={demande.statut}
                />
                
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
  
  
  export default HistoriqueConges;
  