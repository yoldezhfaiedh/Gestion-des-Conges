"use client"

import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import router, { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect } from 'react';
import { deleteCookie } from "cookies-next";
import { getUserRole } from 'src/auth.utils'
import { getUserPrenom } from 'src/decode/prenom.utils'
import axios from 'axios'




   

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
const UserDropdown = () => {
  const router = useRouter()
  const handleLogout = () => {
    try {
      deleteCookie('token')

    
    router.push('/login');  } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };
  const [userRole, setUserRole] = useState(''); // Default role
  const [userPrenom, setUserPrenom] = useState(''); 
  const [userImage, setUserImage] = useState(''); // ou initialisez à null si vous préférez
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks

  


  const handleClick = async () => {
    try {
     

      setUserRole(await getUserRole()); 
      console.log(userRole)

    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };
  
  useEffect(() => {
    handleClick();
  }, []);

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


  const fetchUser = async () => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/auth/Profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Mettez à jour userImage avec l'URL de l'image de profil
        setUserImage(`http://localhost:5000${response.data.image}`);
        // Mettez à jour les autres états d'utilisateur si nécessaire
        setUserRole(response.data.Role);
        
        setUserPrenom(response.data.Prenom);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    }
  };

  // Appel fetchUser dans useEffect
  useEffect(() => {
    fetchUser();
  }, []);

  // Gérer l'ouverture du menu déroulant
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  // Gérer la fermeture du menu déroulant
  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  };

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt={userPrenom}
          src={userImage}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt={userPrenom} src={userImage} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{userPrenom}</Typography>
              <Typography variant='body2' sx={{ fontSize: '1rem', color: 'text.disabled' }}>
                {userRole}
              </Typography>
            </Box>
          </Box>
        </Box>

        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
