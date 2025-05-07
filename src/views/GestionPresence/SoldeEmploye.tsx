// import React, { ChangeEvent, MouseEvent, useState } from 'react';
// import { Card, Grid, Button, Divider, MenuItem, TextField, CardHeader, InputLabel, IconButton, Typography, CardContent, CardActions, FormControl, OutlinedInput, InputAdornment, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import EyeOutline from 'mdi-material-ui/EyeOutline';
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
// import { useFormik } from 'formik';
// import router from 'next/router';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomToast from 'src/@core/components/Alerts/CustomToast';

// const Saisiesolde = () => {
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false); // State to manage dialog visibility

//   interface FormValues {
//     Solde: number;
//     Annee: Date;
//     Email: string;
//   }



//   const initialValues: FormValues = {
//     Solde: 0,
//     Annee: new Date(), // Initialiser à la date actuelle
//     Email: '',
//   };

//   function validate(formValues: FormValues) {
//     const errors: Partial<FormValues> = {};

//     if (!formValues.Solde) {
//       errors.Solde = 'Veuillez saisir le Solde';
//     }
//     if (!formValues.Email) {
//       errors.Email = 'Veuillez saisir Email';
//     }
//     if (!formValues.Annee) {
//       errors.Annee = 'Veuillez saisir l annee';
//     }

//     return errors;
//   }

//   const formik = useFormik({
    // initialValues,
    // onSubmit: async (values) => {
    //   try {
//         const response = await axios.post(
//           "http://localhost:5000/Solde"!,
//           values,
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         if (response.status === 201) {
//           notify("solde a été ajouté avec succès. ");
//           console.log('Réponse réussie:', response.data);
//         }
//       } catch (error) {
//         console.error('Erreur API:', error);
//         notify("Erreur survenue. ");
//       }
//     },
//     validate,
//   });

//   const { Solde, Email, Annee } = formik.values;

//   const handleCancel = () => {
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleConfirmCancel = () => {
//     setDialogOpen(false);
//     // Réinitialiser les valeurs du formulaire ici si nécessaire
//   };

//   return (
//     <>
//       <CustomToast />
//       <Card>
//         <CardHeader title='Ajouter un utilisateur' titleTypographyProps={{ variant: 'h6' }} />
//         <Divider sx={{ margin: 0 }} />
//         <form method="POST" onSubmit={formik.handleSubmit}>
//           <CardContent>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600 }}>
//                   1. Account Details
//                 </Typography>
//               </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <TextField fullWidth type='email' id='Email' label='Email' placeholder='Email' value={Email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            //   </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <TextField fullWidth label='Solde' placeholder='Solde' id="Solde" value={Solde} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            //   </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <TextField fullWidth type="date" label='Année' placeholder='Année' id="Annee" value={Annee} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            //   </Grid>
            // </Grid>
//           </CardContent>
//           <Divider sx={{ margin: 0 }} />
//           <CardActions>
//             <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
//               Submit
//             </Button>
//             <Button size='large' color='secondary' variant='outlined' onClick={handleCancel}>
//               Cancel
//             </Button>
//           </CardActions>
//         </form>
//       </Card>

//       {/* Dialogue de confirmation pour l'annulation */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <Typography>Êtes-vous sûr de vouloir annuler?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Non</Button>
//           <Button onClick={handleConfirmCancel}>Oui</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default Saisiesolde;
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

interface User {
  id: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Role: string;
  departement: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  user: User | null;
}

const Saisiesolde: React.FC<Props> = ({ open, handleClose, user }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  interface FormValues {
    Solde: number;
    Annee: string; // Changez le type de Annee de Date à string
    Email: string;
  }

  const initialValues: FormValues = {
    Solde: 0,
    Annee: new Date().toISOString().substr(0, 10), // Format YYYY-MM-DD
    Email: '',
  };

  function validate(formValues: FormValues) {
    const errors: Partial<FormValues> = {};

   
    if (!formValues.Email) {
      errors.Email = 'Veuillez saisir Email';
    }
    if (!formValues.Annee) {
      errors.Annee = 'Veuillez saisir l annee';
    }

    return errors;
  }

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const notify = (message: string) => {
    toast(message);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/solde",
          values,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 201) {
          notify(response.data);
          console.log('Réponse réussie:', response.data);
        }
      } catch (error) {
        console.error('Erreur API:', error);
      }
    },
    validate,
  });

  const { Solde, Email, Annee } = formik.values;

  return (
    <>
      <CustomToast />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Créer le compte solde </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  id='Email'
                  name='Email'
                  label='Email'
                  placeholder='Email'
                  value={Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Email && Boolean(formik.errors.Email)}
                  helperText={formik.touched.Email && formik.errors.Email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Solde'
                  placeholder='Solde'
                  id='Solde'
                  name='Solde'
                  value={Solde}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Solde && Boolean(formik.errors.Solde)}
                  helperText={formik.touched.Solde && formik.errors.Solde}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Année'
                  placeholder='Année'
                  id='Annee'
                  name='Annee'
                  value={Annee}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Annee && Boolean(formik.errors.Annee)}
                  helperText={formik.touched.Annee && formik.errors.Annee}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>Annuler</Button>
              <Button type="submit" color="primary">Enregistrer le solde</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Saisiesolde;
