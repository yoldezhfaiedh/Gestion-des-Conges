import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Card, Grid, Button, Divider, MenuItem, TextField, CardHeader, InputLabel, IconButton, Typography, CardContent, CardActions, FormControl, OutlinedInput, InputAdornment, Select } from '@mui/material';
import DatePicker from 'react-datepicker';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import { useFormik } from 'formik';
import router from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import DepartementDropdown from './DepartementDropDown';

interface State {
  password: string;
  password2: string;
  showPassword: boolean;
  showPassword2: boolean;
}

const Ajout_users = () => {
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  });

  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };

  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  interface FormValues {
    Email: string;
    password: string;
    Nom: string;
    Prenom: string;
    Role: string | null; 
    Departement : string| null; 
  }
  const notify = (message: string) => {
    toast(message);
  };
  const initialValues: FormValues = {
    Email: '',
    password: '',
    Nom: '',
    Prenom: '',
    Role: null,
    NomDepartement: null
  };
  function isValidEmail(Email : string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(Email);
  }
  
  function validate(formValues: FormValues) {
    const errors: Partial<FormValues> = {};

    if (formValues.Nom === '') {
      errors.Nom = 'Veuillez saisir le nom';
    }
    if (formValues.password === '') {
      errors.password = 'Veuillez saisir le mot de passe';
    }
    if (formValues.Role === null) {
      errors.Role = 'Veuillez saisir le rôle';
    }
    if (formValues.Prenom === '') {
      errors.Prenom = 'Veuillez saisir le prénom';
    }
    if (formValues.Email === '') {
      errors.Email = 'Veuillez saisir l\'email';
    }
    
    if (!isValidEmail(formValues.Email)) {
      errors.Email = 'Veuillez saisir un email valide';
    }
    
    return errors;
  }

  const formik = useFormik({
       initialValues,
       onSubmit: async (values) => {
         try {
           const response = await axios.post(
             "http://localhost:5000/auth/register"!,
             values,
             { headers: { 'Content-Type': 'application/json' } }
           );
           if (response.status === 201) {
             notify("L'utilisateur a été ajouté avec succès. Un email de confirmation a été envoyé.", { type: 'success' });
             console.log('Réponse réussie:', response.data);
            //  window.location.reload(); // Rechargement de la page
           }
         } catch (error) {
           console.error('Erreur API:', error);
           if (error.response.status === 409) { // Status 409 pour conflit (e-mail existant)
             notify("Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre.", { type: 'error' });
           } else {
             notify("Une erreur s'est produite lors de l'ajout de l'utilisateur. Veuillez réessayer.", { type: 'error' });
           }
         }
       },
       validate,
     });

  const { Nom, Prenom, Email, password, Role, Departement } = formik.values;

  const roles = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Responsable Rh",
      label: "Responsable RH",
    },
    {
      value: "Employe",
      label: "Employe",
    },
    {
      value: "Manager",
      label: "Manager",
    },
  ];

  

  return (
    <>
    <CustomToast />
    <Card>
      <CardHeader title='Ajouter un utilisateur' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form method="POST" onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
       1. Informations de connexion
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='Email' id='Email' label='Email' placeholder='Email' value={Email} onChange={formik.handleChange} onBlur={formik.handleBlur }  error={formik.touched.Email && Boolean(formik.errors.Email)}
              helperText={formik.touched.Email && formik.errors.Email}
 />

            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label='Password'
                  value={password}
                  id='password'
                  error={formik.touched.password && Boolean(formik.errors.password)}
    
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                               2. Informations Personnelles

              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nom' placeholder='Nom' id="Nom" value={Nom} onChange={formik.handleChange} onBlur={formik.handleBlur}  error={formik.touched.Nom && Boolean(formik.errors.Nom)}
              helperText={formik.touched.Nom && formik.errors.Nom}
 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Prenom' placeholder='Prenom' id="Prenom" value={Prenom} onChange={formik.handleChange} onBlur={formik.handleBlur}   error={formik.touched.Prenom && Boolean(formik.errors.Prenom)}
              helperText={formik.touched.Prenom && formik.errors.Prenom}
/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='Role'>Role</InputLabel>
                <Select
                  id="Role"
                  value={Role}
                  name="Role"
                  onChange={(event) => formik.setFieldValue("Role", event.target.value as string)}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <DepartementDropdown formik={formik} />
          </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'               disabled={!formik.isValid}
>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
    </>

  );
}

export default Ajout_users;


// import React, { ChangeEvent, MouseEvent, useState } from 'react';
// import { Card, Grid, Button, Divider, MenuItem, TextField, CardHeader, InputLabel, IconButton, Typography, CardContent, CardActions, FormControl, OutlinedInput, InputAdornment, Select } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import EyeOutline from 'mdi-material-ui/EyeOutline';
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
// import { useFormik } from 'formik';
// import router from 'next/router';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomToast from 'src/@core/components/Alerts/CustomToast';
// import DepartementDropdown from './DepartementDropDown';

// interface State {
//   password: string;
//   password2: string;
//   showPassword: boolean;
//   showPassword2: boolean;
// }

// const Ajout_users = () => {
//   const [values, setValues] = useState<State>({
//     password: '',
//     password2: '',
//     showPassword: false,
//     showPassword2: false
//   });

//   const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowConfirmPassword = () => {
//     setValues({ ...values, showPassword2: !values.showPassword2 });
//   };

//   const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   interface FormValues {
//     Email: string;
//     password: string;
//     Nom: string;
//     Prenom: string;
//     Role: string | null; 
//     Departement : string| null; 
//   }
//   const notify = (message: string) => {
//     toast(message);
//   };
//   const initialValues: FormValues = {
//     Email: '',
//     password: '',
//     Nom: '',
//     Prenom: '',
//     Role: null,
//     Departement: ""
//   };

//   function validate(formValues: FormValues) {
//     const errors: Partial<FormValues> = {};

//     if (formValues.Nom === '') {
//       errors.Nom = 'Veuillez saisir le Nom';
//     }
//     if (formValues.Role === null) {
//       errors.Role = 'Veuillez saisir le rôle';
//     }
//     if (formValues.Prenom === '') {
//       errors.Prenom = 'Veuillez saisir le prénom';
//     }

//     return errors;
//   }

//   const formik = useFormik({
//     initialValues,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/auth/register"!,
//           values,
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         if (response.status === 201) {
//           notify("L'utilisateur a été ajouté avec succès. Un email de confirmation a été envoyé.");

//           console.log('Réponse réussie:', response.data);
//           router.push('/500');
//         }
//       } catch (error) {
//         console.error('Erreur API:', error);
//       }
//     },
//     validate,
//   });

//   const { Nom, Prenom, Email, password, Role, Departement } = formik.values;

//   const roles = [
//     {
//       value: "admin",
//       label: "Admin",
//     },
//     {
//       value: "Responsable Rh",
//       label: "Responsable HR",
//     },
//     {
//       value: "Employe",
//       label: "Employe",
//     },
//     {
//       value: "Manager",
//       label: "Manager",
//     },
//   ];


//   return (
//     <>
//     <CustomToast />
//     <Card>
//       <CardHeader title='Ajouter un utilisateur' titleTypographyProps={{ variant: 'h6' }} />
//       <Divider sx={{ margin: 0 }} />
//       <form method="POST" onSubmit={formik.handleSubmit}>
//         <CardContent>
//           <Grid container spacing={5}>
//             <Grid item xs={12}>
//               <Typography variant='body2' sx={{ fontWeight: 600 }}>
//                 1. Informations de connexion
//               </Typography>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth type='Email' id='Email' label='Email' placeholder='Email' value={Email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Password</InputLabel>
//                 <OutlinedInput
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label='Password'
//                   value={password}
//                   id='password'
//                   type={values.showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position='end'>
//                       <IconButton
//                         edge='end'
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         aria-label='toggle password visibility'
//                       >
//                         {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Divider sx={{ marginBottom: 0 }} />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant='body2' sx={{ fontWeight: 600 }}>
//                 2. Informations Personnelles
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label='Nom' placeholder='Nom' id="Nom" value={Nom} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label='Prenom' placeholder='Prenom' id="Prenom" value={Prenom} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id='Role'>Role</InputLabel>
//                 <Select
//                   id="Role"
//                   value={Role}
//                   name="Role"
//                   onChange={(event) => formik.setFieldValue("Role", event.target.value as string)}
//                 >
//                   {roles.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <DepartementDropdown formik={formik} />
//           </Grid>
//           </Grid>
//         </CardContent>
//         <Divider sx={{ margin: 0 }} />
//         <CardActions>
//           <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
//             Submit
//           </Button>
//           <Button size='large' color='secondary' variant='outlined'>
//             Cancel
//           </Button>
//         </CardActions>
//       </form>
//     </Card>
//     </>

//   );
// }

// export default Ajout_users;
