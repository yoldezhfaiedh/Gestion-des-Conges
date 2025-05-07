
// ** MUI Imports
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
import React, { useState } from 'react';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { useFormik } from 'formik'
import axios from 'axios'
import router from 'next/router'
import { TextField } from '@mui/material'

function ChangePassword() {

interface FormValues {
  Email: string;
  password_confirm: string;
  password: string;
}

const initialValues: FormValues = {
  Email: '',
  password_confirm: '',
  password: '',
};

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {};
  if (formValues.Email === '') {
    errors.Email = 'Veuillez saisir votre Email';
  }
  if (formValues.password !== formValues.password_confirm) {
    errors.password_confirm = 'Mot de passe non conforme';
  }

  if (formValues.password === '') {
    errors.password = 'Veuillez saisir le nouveau mot de passe';
  } else if (!/^[A-Z0-9._%+-]+[A-Z0-9.-]+[A-Z]{2,4}$/i.test(formValues.password)) {
    errors.password = 'Votre mot de passe doit contenir lettre maj ....';
  }

  return errors;
}

const formik = useFormik({
  initialValues,
  onSubmit: async (values) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_HOSTAPI2!,
        values,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        console.log('Rep reussi:', response.data);
        // Assuming router is defined somewhere
        router.push('/Login1');
        console.error('Rep inattendu:', response.status);
      }
    } catch (error) {
      console.error('erreur api:', error);
    }
  },
  validate,

});

const { Email, password, password_confirm } = formik.values;
const handleButtonClick = () => {
  formik.setValues({
    ...formik.values,
    Email: '',
    password: '',
    password_confirm: '',
  });
};

 
  return (
<form  method="POST"  noValidate onSubmit={formik.handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
              <TextField
          required
          id="Email"
          variant="outlined"
          placeholder="Email" 
          label="Email"
          name="Email"
          fullWidth
          value={Email}
          //handle submit appelle onsubmit
          onChange={formik.handleChange}
          //fazet el touch 
          onBlur={formik.handleBlur}

        />  
              {formik.errors.Email } 

        </Grid>


              <Grid item xs={12} >
              <TextField
          required
          id="password"
          variant="outlined"
          placeholder="Nouveau mot de passe" 
          label="Nouveau mot de passe"
          name="password"
          fullWidth
          value={password}
          //handle submit appelle onsubmit
          onChange={formik.handleChange}
          //fazet el touch 
          onBlur={formik.handleBlur}
        />  
      {formik.errors.password } 

        </Grid>

        

              <Grid item xs={12}>
              <TextField
          required
          id="password_confirm"
          variant="outlined"
          placeholder="Confirmation du mot de passe" 
          label="Confirmation du mot de passe"
          name="password_confirm"
          fullWidth
          value={password_confirm}
          //handle submit appelle onsubmit
          onChange={formik.handleChange}
          //fazet el touch 
          onBlur={formik.handleBlur}
        />  
              {formik.errors.password_confirm } 

        </Grid>


            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
      

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
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
        </Box>
      </CardContent>
    </form>
  )
}
export default ChangePassword