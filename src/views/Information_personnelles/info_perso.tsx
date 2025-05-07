import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid, Paper, Button, Avatar, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ** Composants et styles
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)({
  margin: '8px 0',
});

// Fonction pour afficher une information utilisateur
const UserInfoDisplay: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', mt: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Paper>
  </Grid>
);

const profil: React.FC<{ userId: string }> = ({ userId }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Référence au champ de fichier

  useEffect(() => {
    fetchUser();
  }, []);

  // Fonction pour récupérer le token depuis les cookies
  function getTokenFromCookies(cookieName: string) {
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

  // Fonction pour récupérer les données de l'utilisateur depuis l'API
  const fetchUser = async () => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/auth/infProfile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setImgSrc(`http://localhost:5000${response.data.image}`);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    }
  };

  // Fonction pour gérer le changement de fichier
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Fonction pour envoyer le fichier au serveur
  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.put(`http://localhost:5000/users/${userData._id}/photo/?id=${userData._id}`, formData);
      if (response.status === 201) {
        console.log('Photo mise à jour avec succès');
        fetchUser();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo:', error);
    }
  };

  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          Vos Informations
        </Typography>

        {/* Photo Upload Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar alt="Profile Pic" src={imgSrc} sx={{ width: 150, height: 150 }} />
              <Box>
                <ButtonStyled variant='contained' onClick={() => inputRef.current?.click()}>
                télécharger une nouvelle photo
                  <input
                    type='file'
                    hidden
                    accept='image/png, image/jpeg'
                    onChange={onChange}
                    ref={inputRef} // Référence au champ de fichier
                  />
                </ButtonStyled>
                <ButtonStyled color='primary' variant='contained' onClick={handleSubmit} sx={{ marginLeft: 2 }}>
                  Mettre à jour la photo
                </ButtonStyled>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* User Information Display */}
        <Grid container spacing={2} justifyContent="center">
          {userData && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Nom"
                value={userData.Nom}
                fullWidth
                disabled
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Prénom"
                value={userData.Prenom}
                fullWidth
                disabled
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={userData.Email}
                fullWidth
                disabled
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
               <TextField
                label="Role"
                value={userData.Role}
                fullWidth
                disabled
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Département"
                value={userData.Departement ? userData.Departement.NomDepartement : ''}
                fullWidth
                disabled
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default profil;
