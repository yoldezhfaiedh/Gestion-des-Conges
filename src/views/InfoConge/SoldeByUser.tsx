import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios'; // Importer axios

// Composants stylisés pour les images de fond et de trophée
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
});

const TrophyImg = styled('img')({
  right: 36,
  bottom: 150,
  height: 98,
  position: 'absolute'
});

// Fonction pour obtenir le token à partir des cookies
function getTokenFromCookies(cookieName) {
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

const SoldeByUser = () => {
  const theme = useTheme();
  // Initialisation de `soldeData` à un tableau vide
  const [soldeData, setSoldeData] = useState([]);

  useEffect(() => {
    const fetchSoldeData = async () => {
      const token = getTokenFromCookies('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/solde/User', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = response.data;
          if (Array.isArray(data)) {
            setSoldeData(data);
          } else {
            console.error('La réponse de l\'API n\'est pas un tableau :', data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données de solde :', error);
        }
      } else {
        console.error('Le token est invalide ou manquant.');
      }
    };

    fetchSoldeData();
  }, []); // Déclencher une seule fois au montage (avec les dépendances vides [])

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
  
  return (
    <>
      {soldeData.length > 0 ? (
        soldeData.map((solde, index) => (
          <Card key={index} sx={{ position: 'relative', mb: 3 }}>
            <CardContent>
              <Typography variant='h5' sx={{ my: 3, letterSpacing: '0.25px' }}>
                Votre solde de congé est de :
              </Typography>
              <Typography variant='h5' sx={{ color: 'primary.main' }}>
                {solde.Solde} Jours
              </Typography>
              <Typography variant='h6' sx={{ my: 3, color: 'secondary.main' }}>
                Cette allocation est pour l'année : {convertirDate(solde.Annee)} 
              </Typography>
              <TriangleImg
                alt='triangle background'
                src={`/images/misc/${
                  theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
                }`}
              />
              <TrophyImg alt='trophy' src='/images/pages/tanit.png' />
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>Chargement...</Typography>
      )}
    </>
  );
};

export default SoldeByUser;
