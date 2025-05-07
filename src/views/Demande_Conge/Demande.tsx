import React, { useState, ChangeEvent, forwardRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import DatePicker from 'react-datepicker';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast'

// ** Custom Components
import LeaveTypeDropdown from './LeaveTypeDropdown';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

// Style for the file input image
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

// Styled buttons
const ButtonStyled = styled(Button)<{ component?: React.ElementType; htmlFor?: string }>(
  ({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  })
);

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));


// Form values interface
interface FormValues {
  NomDemande: string;
  Date_debut: Date | null;
  Date_fin: Date | null;
  NombreJours: number;
  typeCongeNom: string;
}
const notify = (message: string) => {
  toast(message);
};

// Custom input components for the date pickers
const CustomInputD = forwardRef<HTMLInputElement>((props, ref) => (
  <TextField
    inputRef={ref}
    label="Date de congé"
    value={props.value}
    fullWidth
    {...props}
  />
));

const CustomInputF = forwardRef<HTMLInputElement>((props, ref) => (
  <TextField
    inputRef={ref}
    label="Date de reprise"
    value={props.value}
    fullWidth
    {...props}
  />
));

// Main component
const LeaveRequest: React.FC = () => {
  // State to hold the image file and dates
  const [imgSrc, setImgSrc] = useState<string>('');
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Handle file change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const { files } = e.target;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Initial values for the formik form
  const initialValues: FormValues = {
    NomDemande: '',
    Date_debut: dateDebut,
    Date_fin: dateFin,
    NombreJours: 0,
    typeCongeNom: '',
  };

  // Validate function for formik
  const validate = (values: any) => {
    const errors: any = {};

    if (!values.NomDemande) {
      errors.NomDemande = 'Champ obligatoire';
    }

    if (!values.NombreJours) {
      errors.NombreJours = 'Champ obligatoire';
    }

    if (values.Date_debut && values.Date_fin) {
      const dateDebut = new Date(values.Date_debut);
      const dateFin = new Date(values.Date_fin);

      if (dateDebut > dateFin) {
        errors.Date_debut = 'La date de congé doit être avant la date de reprise';
        errors.Date_fin = 'La date de reprise ne peut pas être avant la date de congé';
      }
    }

    return errors;
  };
  function getTokenFromCookies(cookieName:any) {
    // Obtenez tous les cookies sous forme de chaîne
    const cookieString = document.cookie;
    // Divisez la chaîne de cookies en un tableau de paires "nom=valeur"
    const cookies = cookieString.split('; ');
    
    // Parcourez les paires de cookies
    for (const cookie of cookies) {
        // Divisez chaque paire en nom et valeur
        const [name, value] = cookie.split('=');
        // Vérifiez si le nom du cookie correspond à `cookieName`
        if (name === cookieName) {
            // Les valeurs des cookies sont encodées en URL, il faut les décoder
            return decodeURIComponent(value);
        }
    }

    // Si le cookie n'est pas trouvé, renvoyez `null`
    return null;
}

// Exemple d'utilisation pour récupérer le token
const token = getTokenFromCookies('token');
if (token) {
    console.log('Token d\'authentification récupéré:', token);
} else {
    console.log('Le cookie "token" n\'a pas été trouvé');
}
  // Formik form handling
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Create a new FormData object and append form values and file
        const formData = new FormData();
        formData.append('NomDemande', values.NomDemande);
        formData.append('Date_debut', dateDebut ? dateDebut.toISOString() : '');
        formData.append('Date_fin', dateFin ? dateFin.toISOString() : '');
        formData.append('NombreJours', values.NombreJours.toString());
        formData.append('typeCongeNom', values.typeCongeNom);
        if (file) {
          formData.append('image', file);
        }

        const res = await axios.post('http://localhost:5000/demandeconge/deposer', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Ajout du token
          },
        });
        
        if (res.data.response && res.data.response.data) {
          notify(res.data.response.data); // Afficher le message d'erreur
 

        } else {
          // Traiter la réponse réussie, par exemple, rediriger l'utilisateur ou afficher un message de succès
          notify('Opération réussie !'); // Exemple de message de succès
          console.log('Réponse de l\'API:', res.data);
        }
      } catch (error) {
        console.error('Erreur API:', error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      }
    },
    validate,
  });

  return (
    <>
    <CustomToast />
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt="fichier justificatif" />
              <Box>
                <ButtonStyled component="label" variant="contained" htmlFor="fichier-justificatif">
                  Ajouter un fichier justificatif
                  <input
                    hidden
                    type="file"
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                    id="fichier-justificatif"
                  />
                </ButtonStyled>
                <ResetButtonStyled color="error" variant="outlined" onClick={() => setImgSrc('/images/avatars/')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              id="NomDemande"
              label="Demande"
              placeholder="Demande"
              value={formik.values.NomDemande}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.NomDemande && Boolean(formik.errors.NomDemande)}
              helperText={formik.touched.NomDemande && formik.errors.NomDemande}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              id="NombreJours"
              label="Nombre de Jours"
              placeholder="Nombre de Jours"
              value={formik.values.NombreJours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.NombreJours && Boolean(formik.errors.NombreJours)}
              helperText={formik.touched.NombreJours && formik.errors.NombreJours}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LeaveTypeDropdown formik={formik} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={dateDebut}
                showYearDropdown
                showMonthDropdown
                id="Date_debut"
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInputD />}
                onChange={(date: Date | null) => {
                  setDateDebut(date);
                  formik.setFieldValue('Date_debut', date?.toISOString().slice(0, 10));
                }}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={dateFin}
                showYearDropdown
                showMonthDropdown
                id="Date_fin"
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInputF />}
                onChange={(date: Date | null) => {
                  setDateFin(date);
                  formik.setFieldValue('Date_fin', date?.toISOString().slice(0, 10));
                }}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginRight: 3.5 }}
              disabled={!formik.isValid}
            >
              Déposer votre demande
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

export default LeaveRequest;
