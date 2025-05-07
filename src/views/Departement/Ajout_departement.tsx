import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline';
import EmailOutline from 'mdi-material-ui/EmailOutline';
import { useFormik } from 'formik';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import router from 'next/router';

interface FormValues {
  NomDepartement: string;
  Managers: string;
}

const AjoutDepartement = () => {
  const initialValues: FormValues = {
    NomDepartement: "",
    Managers: "",
  };

  const validate = (formValues: FormValues): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (formValues.NomDepartement === "") {
      errors.NomDepartement = "Veuillez saisir le Nom du departement";
    }

    if (formValues.Managers === "") {
      errors.Managers = "Veuillez saisir le Nom du manager";
    }

    return errors;
  };

  const notify = (message: string) => {
    toast(message);
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (formValues) => {
      try {
        const response = await axios.post("http://localhost:5000/Departement/", formValues, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.status === 201) {
          console.log('success');
          notify("Departement ajouté avec succès.");
          window.location.reload();
        }
      } catch (error) {
        console.error('erreur api:', error);
        notify("Veuillez Réessayer.");
      }
    },
  });

  const { NomDepartement, Managers } = formik.values;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Card>
        <CardHeader title='Ajouter un departement' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form method="post" onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='NomDepartement'
                  placeholder='NomDepartement'
                  id="NomDepartement"
                  name="NomDepartement"
                  value={NomDepartement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.NomDepartement && Boolean(formik.errors.NomDepartement)}
                  helperText={formik.touched.NomDepartement && formik.errors.NomDepartement}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Manager'
                  placeholder='Manager'
                  id="Managers"
                  name="Managers"
                  value={Managers}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Managers && Boolean(formik.errors.Managers)}
                  helperText={formik.touched.Managers && formik.errors.Managers}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AjoutDepartement;
