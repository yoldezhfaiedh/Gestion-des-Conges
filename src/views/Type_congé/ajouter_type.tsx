// ** React Imports
import { useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

const NouveauType = () => {
    const notify = (message: string) => {
        toast(message);
      };
  interface FormValues {
    Nom: string;
  }

  const initialValues: FormValues = {
    Nom: '',
  };

  function validate(formValues: FormValues) {
    const errors: Partial<FormValues> = {};

    if (formValues.Nom === '') {
      errors.Nom = 'Veuillez saisir le nom';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/typeDemande',
          values,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 201) {
          console.log('Réponse réussie:', response.data);
          notify("Le nouveau type a été ajouté avec succès");

        }
      } catch (error) {
        console.error('Erreur API:', error);
        notify("Erreur");

      }
    },
    validate,
  });

  const { Nom } = formik.values;

  return (
    <>
    <CustomToast />
    <CardContent>
      <form method="POST" onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="Nom"
              id="Nom"
              label="Nom de type de congé"
              placeholder="Nom"
              value={Nom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginRight: 3.5 }}
            >
              Ajouter le nouveau type de congé
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Annuler
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
    </>

  );
};

export default NouveauType;

