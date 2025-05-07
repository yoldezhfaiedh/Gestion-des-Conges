import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

interface DataType {
  NombrePresence: number;
  trendDir: 'up' | 'down';
  Mois: Date;
  title: string;
  avatarText: string;
  avatarColor: string;
}

const HistoriquePresence = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  function getTokenFromCookies(cookieName : any) {
    // Obtenez tous les cookies sous forme de chaîne
    const cookieString = document.cookie;
    // Divisez la chaîne de cookies en un tableau de paires "nom=valeur"
    const cookies = cookieString.split('; ');
    
    // Parcourez les paires de cookies
    for (const cookie of cookies) {
        // Divisez chaque paire en nom et valeur
        const [name, value] = cookie.split('=');
        // Vérifiez si le nom du cookie correspond à `cookieName`
        if (name === cookieName) {
            // Les valeurs des cookies sont encodées en URL, il faut les décoder
            return decodeURIComponent(value);
        }
    }

    // Si le cookie n'est pas trouvé, renvoyez `null`
    return null;
}

  useEffect(() => {
    const fetchPresence = async () => {
      const token = getTokenFromCookies('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/presence/User', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setData(response.data);
          setLoading(false); // Mettre le chargement à false une fois les données chargées
        } catch (error) {
          console.error('Erreur lors de la récupération des présences:', error);
          setLoading(false); // Mettre le chargement à false en cas d'erreur
        }
      }
    };

    fetchPresence();
  }, []); // Déclencher une seule fois au montage (avec les dépendances vides [])

  const getAvatarText = (month: number): string => {
    // Map the numeric month to its equivalent text representation
    switch (month) {
      case 1:
        return 'Janvier';
      case 2:
        return 'Février';
      case 3:
        return 'Mars';
      case 4:
        return 'Avril';
      case 5:
        return 'Mai';
      case 6:
        return 'Juin';
      case 7:
        return 'Juillet';
      case 8:
        return 'Août';
      case 9:
        return 'Septembre';
      case 10:
        return 'Octobre';
      case 11:
        return 'Novembre';
      case 12:
        return 'Décembre';
      default:
        return ''; // Handle the default case
    }
  };

  const getFormattedDate = (date: Date): string => {
    return date.toLocaleString('fr-FR', { year: 'numeric', month: 'long' });
  };

  return (
    <Card>
      <CardHeader
        title='Vos Présences'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index !== data.length - 1 ? '5.875px' : '0' // Corrected marginBottom value
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `#ffc107`
                }}
              >
                {getAvatarText(new Date(item.Mois).getMonth() + 1)} {/* Get month text */}
              </Avatar>
              <Typography variant="subtitle1">
                En <strong>{getFormattedDate(new Date(item.Mois))}</strong> vous avez cumulé une présence de <strong>{item.NombrePresence}</strong> jours
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default HistoriquePresence;
