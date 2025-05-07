import React, { useState, useEffect, Fragment, ReactNode } from 'react';
import axios from 'axios';
import { Box, IconButton, Button, Menu as MuiMenu, MenuItem as MuiMenuItem, Typography, Avatar as MuiAvatar, Chip, styled, Theme, useMediaQuery } from '@mui/material';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import BellOutline from 'mdi-material-ui/BellOutline';

// ** Styles pour le Menu
const Menu = styled(MuiMenu)({
  // styles ici...
});

// ** Styles pour MenuItem
const MenuItem = styled(MuiMenuItem)({
  // styles ici...
});

// ** Styles pour PerfectScrollbar
const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0,
  },
};

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles,
});

const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
});

const MenuItemTitle = styled(Typography)({
  // styles ici...
});

const MenuItemSubtitle = styled(Typography)({
  // styles ici...
});

// Types de données
interface Notification {
  _id: string;
  contenu: string;
  date: string;
  sender: {
    _id: string;
    Nom: string;
    Prenom: string;

    image: string;
  };
}

const NotificationDropdown: React.FC = () => {
  // États
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hook pour vérifier si l'écran est caché
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // Fonction pour ouvrir le menu
  const handleDropdownOpen = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  // Fonction pour fermer le menu
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // Fonction pour récupérer le token à partir des cookies
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

  // Fonction pour récupérer le profil utilisateur
  const fetchUser = async () => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/auth/Profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data;
          // Récupérer l'URL de l'image de profil utilisateur
          
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    }
  };

  // Fonction pour récupérer les notifications
  const fetchNotifications = async () => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        const response = await axios.get<Notification[]>('http://localhost:5000/notifications/notifs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setNotifications(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    }
    setLoading(false);
  };

  // Fonction pour supprimer une notification
  const deleteNotification = async (id: string) => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        // Envoyer une requête DELETE à votre API backend
        await axios.delete(`http://localhost:5000/notifications/${id}/delete/?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Actualisez les notifications après la suppression
        fetchNotifications();
      } catch (error) {
        console.error('Erreur lors de la suppression de la notification:', error);
      }
    }
  };

  // Appeler `fetchNotifications` et `fetchUser` dès le montage du composant
  useEffect(() => {
    fetchNotifications();
    fetchUser();
  }, []);

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {loading ? (
            <MenuItem>
              <Typography variant='body2'>Chargement des notifications...</Typography>
            </MenuItem>
          ) : (
            notifications.map((notification) => (
              <MenuItem key={notification._id}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  {/* Utilisez l'URL de l'image de profil du receveur */}
                  <Avatar alt={notification.sender.Nom} src={`http://localhost:5000/${notification.sender.image}`} />
                  <Box sx={{ mx: 4, flex: '1 1 auto', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    {/* Afficher le nom du receveur */}
                    <Typography variant='body1' fontWeight='bold'>
                      {notification.sender.Prenom}   {notification.sender.Nom}
                    </Typography>
                    {/* Afficher le contenu de la notification */}
                    <Typography variant='body2'>
                      {notification.contenu}
                    </Typography>
                  </Box>
                  {/* Afficher la date de la notification */}
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {/* {new Date(notification.date).toLocaleDateString()} */}
                  </Typography>
                  {/* Ajouter un bouton pour supprimer la notification */}
                  <Button
                    variant='outlined'
                    color='secondary'
                    size='small'
                    onClick={() => deleteNotification(notification._id)}
                  >
                    Supprimer
                  </Button>
                </Box>
              </MenuItem>
            ))
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Masquer les notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;

//  // Fonction pour récupérer les notifications
//  const fetchNotifications = async () => {
//   const token = getTokenFromCookies('token');
//   if (token) {
//     try {
//       const response = await axios.get<Notification[]>('http://localhost:5000/notifications/notifs', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des notifications:', error);
//     }
//   }
//   // Définition de setInterval pour exécuter fetchNotifications toutes les 500ms
//   const intervalId = setInterval(fetchNotifications, 5000); // Répétition toutes les 5 secondes
//   // Arrêter l'intervalle lorsque le composant est démonté ou lors du rechargement des notifications
//   return () => clearInterval(intervalId);
//   setLoading(false);
// };