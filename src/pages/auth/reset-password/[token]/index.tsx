
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import React, { ReactNode, useState } from 'react';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast';
import router from 'next/router'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
function reset_password() {
    const router = useRouter();
    const { token } = router.query; // Cela récupère le token de l'URL
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    console.log(token)
interface FormValues {
  passwordConfirm: string;
  password: string;
}
const notify = (message: string) => {
  toast(message);
};

const initialValues: FormValues = {
  passwordConfirm: '',
  password: '',
};

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {};
  
  if (formValues.password !== formValues.passwordConfirm) {
    errors.passwordConfirm = 'Mot de passe non conforme';
  }
  if (formValues.password === '') {
    errors.password = 'Veuillez saisir le nouveau mot de passe';
  } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(formValues.password)) {
    errors.password = 'Votre mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial.';
  }
  

  return errors;
}

const handleButtonClicklogin = () => {
  router.push('/login');
};

const formik = useFormik({
  initialValues,
  validate,
  onSubmit: async (formValues) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password?token=${token}`,
        formValues
      );

      if (response.status === 200) {
        // Password reset successful, handle success here
       notify("Mot de passe changé avec succès, veuillez vous reconnecter."); // Redirect to the login page
      } else {
        // Handle other status codes if needed
        console.log("Password reset failed with status:", response.status);
      }
    } catch (error) {
      notify('Une erreur est survenue. Veuillez réessayer.');
      // Handle error in case of network failure or other issues
      console.error("Error occurred:", error);
    }
  },
});

const handleButtonClick = () => {
  formik.setValues({
    ...formik.values,
 
    password: '',
    passwordConfirm: '',
  });
};

 
  return (
    <>
    <CustomToast />
<form method="POST" noValidate onSubmit={formik.handleSubmit}>
  <CardContent sx={{ paddingBottom: 0, marginTop: '200px' }}>
    <Grid container justifyContent="center" spacing={5}> 
      <Grid item xs={12} sm={6}>
        <Grid container spacing={5}>

              <Grid item xs={12} >
              <TextField
           required
           id="password"
           variant="outlined"
           placeholder="Nouveau Mot de passe"
           label="Nouveau Mot de passe"
           type="password" 
           name="password"
           fullWidth
           value={formik.values.password}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.password && Boolean(formik.errors.password)}
           helperText={formik.touched.password && formik.errors.password}
        />  

        </Grid>

        

              <Grid item xs={12}>
              <TextField
          required
          
           id="passwordConfirm"
           variant="outlined"
           type="password" 
           placeholder="Confirmation du Mot de passe"
           label="Confirmation Mot de passe"
           name="passwordConfirm"
           fullWidth
           value={formik.values.passwordConfirm}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
           helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        />  

        </Grid>


       

      <Divider sx={{ margin: 0 }} />

      

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center', ml:50 }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
             
    <Button variant="outlined"type="submit"    disabled ={!formik.isValid || formik.isSubmitting}
>Changer votre mot de passe</Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={handleButtonClick}     
                 >
            Reset
          </Button>
         
          <Button
            type='submit'
            variant='outlined'
            color='primary'
            onClick={handleButtonClicklogin}
            >
            Se connecter
          </Button>
        </Box>
        </Grid>
          </Grid>

        
        </Grid>
      </CardContent>      <FooterIllustrationsV1 />

    </form>
    </>
  )
}
reset_password.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default reset_password