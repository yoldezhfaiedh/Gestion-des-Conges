import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import { toast } from 'react-hot-toast';

interface FormValues {
  Email: string;
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const ChangePassword = () => {
  const theme = useTheme();
  const router = useRouter();

  const notify = (message: string) => {
    toast(message);
  };

  const initialValues: FormValues = {
    Email: ''
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.Email) {
      errors.Email = 'Champ obligatoire';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
      errors.Email = 'Champ invalide';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (formValues) => {
      try {
        const res = await axios.post('http://localhost:5000/auth/reset-request', formValues);

        if (res.status === 200) {
          notify('Veuillez vérifier votre boîte mail');
        } else {
          notify('Une erreur est survenue');
        }
      } catch (error: any) {
        notify('Une erreur est survenue');
      }
    }
  });

  const { Email } = formik.values;

  return (
    <>
      <CustomToast />
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                Récupération du mot de passe
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ marginBottom: 4 }}
                required
                id="Email"
                variant="outlined"
                placeholder="Email"
                label="Email"
                name="Email"
                fullWidth
                value={Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
              />
              <Button
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                disabled={!formik.isValid}
              >
                Envoyer un Email de récupération
              </Button>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </>
  );
};

ChangePassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default ChangePassword;
