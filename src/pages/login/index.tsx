import React, { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import { AxiosError } from 'axios';

import InputAdornment from '@mui/material/InputAdornment';
import EyeOutline from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import MuiFormControl from '@mui/material/FormControl';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import axios from 'axios';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import { getUserRole } from 'src/auth.utils';
import toast from 'react-hot-toast';
import { type } from 'os';


interface FormValues {
  Email: string;
  password: string;
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControl = styled(MuiFormControl)({
  width: '100%'
});

const Login= () => {
  const theme = useTheme();
  const router = useRouter();
    const [userRole, setUserRole] = useState<string | undefined>();

  const [values, setValues] = useState<{ password: string; showPassword: boolean }>({
    password: '',
    showPassword: false,
  });

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const notify = (message: string) => {
    toast(message);
  };

  const initialValues: FormValues = {
    Email: "",
    password: "",
  };

  const validate = (values: any) => {
    const errors: any = {}
    if (!values.Email) {
      errors.Email = ('Champ obligatoire')
    } else if (values.Email !== 'superadmin') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
        errors.Email = ('Champ invalide')
      }
    }
    if (!values.password) {
      errors.password = ('Champ obligatoire')
    }

    return errors
  }

  useEffect(() => {
    const fetchUserRole = async () =>{
      try {
        const role = await getUserRole();
        setUserRole(role);
      } catch (error) {
        console.error('Error retrieving user role:', error);
      }
    };
  
    const intervalId = setInterval(() => {
      if (userRole === undefined) {
        fetchUserRole();
      }
    }, 1000); // Change the interval time to your desired value in milliseconds
  
    // Clear the interval when the component unmounts or when userRole changes
    return () => clearInterval(intervalId);
  }, [userRole, setUserRole]);
  
  const formik = useFormik({
    initialValues,
    onSubmit: async (formValues) => {
      try {
        const res = await axios({
          url: `http://localhost:5000/auth/login`,
          method: 'POST',
          data: formValues,
          headers: { 'content-type': 'application/json' }
        });

        if (res.status === 200) {
          deleteCookie('token');
          setCookie('token', res.data.token, { maxAge: 3600 * 24 });
          let role = res.data.user.Role;
          setUserRole(role);
          console.log("hellohelooooo" + userRole);
          window.location.reload();
          window.location.href = '/'; // Remplacez '/accueil' par l'URL de la page d'accueil
      

          if (role === 'Admin') {
            setCookie('token', res.data.token, { maxAge: 3600 * 24 });
        
            router.push('/');
        } else if (role === 'Responsable Rh') {
          setCookie('token', res.data.token, { maxAge: 3600 * 24 });
        
          router.push('/');
      
        } else if (role === 'manager') {
          setCookie('token', res.data.token, { maxAge: 3600 * 24 });
        
          router.push('/');
      
          } else if (role === 'Employe') {
            setCookie('token', res.data.token, { maxAge: 3600 * 24 });
        
          router.push('/');

          }
  }else {
          notify('Une erreur est survenue');
        }
      } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          notify('Identifiants invalides');
          // router.push({
          //   pathname: '/reset-password',
          //   query: { email: formik.values.email }
          // });
        } else if (axiosError.response?.data) {
          notify('Identifiants invalides');
        } else {
          notify('Une erreur est survenue');
        }
      }
    },
    validate: validate,
  });

  const { Email, password } = formik.values;

  return (
    <>
    <CustomToast />
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important',
              }}
            >
              Connexion
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              {/* Welcome! 👋🏻 */}
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ marginBottom: 4 }}
              required
              id="Email"
              variant="outlined"
              placeholder="Email"
              label="Email"
              name="Email"
              fullWidth
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Email && Boolean(formik.errors.Email)}
              helperText={formik.touched.Email && formik.errors.Email}
            />

            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                sx={{ marginTop: 3, marginBottom: 4 }}
                required
                placeholder="Password"
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Link passHref href="/ChangePassword">
                <a style={{ fontSize: '0.875rem', textDecoration: 'none', color: 'primary' }}>
                  Mot de passe oublié?
                </a>
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              disabled={!formik.isValid}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  </>
);
};

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Login;



 /**const handleLinkClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_HOSTAPI2,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        console.log('Réponse réussie:', response.data);
        // Faites quelque chose avec la réponse réussie

      } else if (response.status === 201) {
        CustomToast({ message: ('Une erreur est survenue'), type: 'error' })
        console.log('Token:', response.data.token);
      }
    } catch (error) {
      console.error('Erreur API:', error);
    }
  };*/
