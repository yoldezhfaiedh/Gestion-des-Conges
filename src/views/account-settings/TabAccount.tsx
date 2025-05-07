// // ** React Imports
// import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Link from '@mui/material/Link'
// import Alert from '@mui/material/Alert'
// import Select from '@mui/material/Select'
// import { styled } from '@mui/material/styles'
// import MenuItem from '@mui/material/MenuItem'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import InputLabel from '@mui/material/InputLabel'
// import AlertTitle from '@mui/material/AlertTitle'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import Button, { ButtonProps } from '@mui/material/Button'

// // ** Icons Imports
// import Close from 'mdi-material-ui/Close'
// import { Container, Box, Typography, Grid, Paper, Button } from '@mui/material';
// import axios from 'axios';

// const UserInfoDisplay = ({ label, value }) => (
//   <Grid item xs={12} md={6}>
//     <Paper elevation={3} sx={{ p: 2, height: '100%'  , mt:'40'} }>
//       <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{label}</Typography>
//       <Typography>{value}</Typography>
//     </Paper>
//   </Grid>
// );
// const ImgStyled = styled('img')(({ theme }) => ({
//   width: 120,
//   height: 120,
//   marginRight: theme.spacing(6.25),
//   borderRadius: theme.shape.borderRadius
// }))

// const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     textAlign: 'center'
//   }
// }))

// const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
//   marginLeft: theme.spacing(4.5),
//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     marginLeft: 0,
//     textAlign: 'center',
//     marginTop: theme.spacing(4)
//   }
// }))

// const TabAccount = () => {
//   // ** State
//   const [openAlert, setOpenAlert] = useState<boolean>(true)
//   const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/users/yoldez.hfaiedh+0333@esen.tn");
//       if (response.status === 200) {
//         setUserData(response.data);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des données utilisateur:', error);
//     }
//   };

//   const onChange = (file: ChangeEvent) => {
//     const reader = new FileReader()
//     const { files } = file.target as HTMLInputElement
//     if (files && files.length !== 0) {
//       reader.onload = () => setImgSrc(reader.result as string)

//       reader.readAsDataURL(files[0])
//     }
//   }
//   const handleSubmit = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       // Remplacez l'URL par l'URL de votre API
//       const response = await axios.put(`http://localhost:5000/users/${userId}/photo`, formData);

//       // Afficher un message de succès
//       if (response.status === 200) {
//         console.log('Photo mise à jour avec succès');
//         // Mettez à jour l'interface utilisateur ou prenez d'autres mesures selon vos besoins
//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de la photo:', error);
//     }
//   };
//   return (
//     <CardContent>
//       <form>
//         <Grid container spacing={7}>
//           <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <ImgStyled src={imgSrc} alt='Profile Pic' />
//               <Box>
//                 <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
//                   Upload New Photo
//                   <input
//                     hidden
//                     type='file'
//                     onChange={onChange}
//                     accept='image/png, image/jpeg'
//                     id='account-settings-upload-image'
//                   />
//                 </ButtonStyled>
//                 <ResetButtonStyled color='error' variant='outlined' onClick={handleSubmit}>
//                   Reset
//                 </ResetButtonStyled>
//                 <Typography variant='body2' sx={{ marginTop: 5 }}>
//                   Allowed PNG or JPEG. Max size of 800K.
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//           <Container >
//         <Box sx={{ mt: 4 }}>
//           <Typography  sx={{ mt: 10}} variant="h4" gutterBottom>
//             Informations Utilisateur
//           </Typography>
//           <Grid container spacing={6}>
//             {userData && (
//               <>
//                 <UserInfoDisplay label="Nom" value={userData.Nom} />
//                 <UserInfoDisplay label="Prénom" value={userData.Prenom} />
//                 <UserInfoDisplay label="Email" value={userData.Email} />
//                 <UserInfoDisplay label="Departement" value={userData.Departement} />
//                 <UserInfoDisplay label="Manager" value={userData.Departement.Manager} />
        

            
//               </>
//             )}
            
//           </Grid>
                  
//           <Typography  sx={{ mb: 100}} variant="h4" gutterBottom>
//           </Typography>
//         </Box>
//       </Container>
//   )
// }

// export default TabAccount
