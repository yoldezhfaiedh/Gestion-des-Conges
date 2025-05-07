import React, { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik'; // Importez useFormik de Formik
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker'

import axios from 'axios';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import router from 'next/router';
import Demande from './Demande';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import LeaveTypeDropdown from './LeaveTypeDropdown';
interface DemandeConge {
  _id: string;
  TypeConge: {
    Nom: string;
  };
  statut: string;
  NomDemande: string;
  NombreJours: number;
  Date_debut: string | Date; 
  Date_fin: string | Date; 
}

interface FormValues {
  NomDemande: string;
  Date_debut:Date |string;
  Date_fin:Date| string;
  typeCongeNom:string;
  NombreJours:number
  // Email:string;
  // Motif:string
}


interface Props {
  open: boolean;
  handleClose: () => void;
demande: DemandeConge | null;  
}

const notify = (message: string) => {
  toast(message);
};
const EditUserDialog: React.FC<Props> = ({ open, handleClose, demande }) => {
  const [editeddemande, setEditedDemande] = useState<DemandeConge >();
  const [dateDebut, setDateDebut] = useState<Date | null>(null)
  const [dateFin, setDateFin] = useState<Date | null>(null)

  const initialValues: FormValues = {
    NomDemande: NomDemande,
    Date_debut: new Date(),
    Date_fin: new Date(),
    NombreJours: NombreJours,
    typeCongeNom: "",
  };

  

  const CustomInputD = forwardRef((props, ref) => {
    return (
      <TextField
        inputRef={ref}
        label='Date de congé'
        value={dateDebut ? dateDebut.toISOString().slice(0, 10) : ''}
        fullWidth
        {...props}
      />
    )
  })

  const CustomInputF = forwardRef((props, ref) => {
    return (
      <TextField
        inputRef={ref}
        label='Date de reprise'
        value={dateFin ? dateFin.toISOString().slice(0, 10) : ''}
        fullWidth
        {...props}
      />
    )
  })
  useEffect(() => {
    if (demande) {
      setEditedDemande(demande);
    }
  }, [demande]);
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/demandeconge/${editeddemande!._id}?id=${editeddemande!._id }`,
          values,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          console.log('Réponse réussie:', response.data);
          notify("Demande modifiée avec succés.");

          // router.push('/');
        }
      } catch (error) {
        console.error('Erreur API:', error);
      }
    },
  });

  const { NomDemande, Date_debut, Date_fin, typeCongeNom, NombreJours } = formik.values;


  // const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
  //   const { name, value } = e.target;
  //   if (name) {
  //     setEditedUser(prevState => ({
  //       ...prevState!,
  //       [name]: value,
  //     }));
  //   }
  // };

  return (
    <>
    <CustomToast />
    <Dialog open={open} onClose={handleClose}   PaperProps={{
        style: {
          width: '90%', // Adjust the width as needed
          height: '90%', // Adjust the height as needed
        },
      }} >
      <DialogTitle>Modifier les informations de votre congé </DialogTitle>
      <DialogContent>
       
      <form method ="Post" onSubmit={formik.handleSubmit} >
      <Grid container spacing={7}>

          <Grid item xs={12} sm={6}>
          <TextField fullWidth type='NomDemande' id='NomDemande' label='Demande' placeholder='Demande' value={formik.values.NomDemande} onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='NombreJours'
              id='NombreJours'
              label='NombreJours'
              placeholder='NombreJours'
              value={formik.values.NombreJours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
                id='Date_debut'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputD />}
                onChange={(date: Date | null) => {
                  setDateDebut(date);
                  formik.setFieldValue('Date_debut', date);
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
                id='Date_fin'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputF />}
                onChange={(date: Date | null) => {
                  setDateFin(date);
                  formik.setFieldValue('Date_fin', date);
                }}
              />
            </DatePickerWrapper>
          </Grid>

        
        </Grid>
                    
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained">Annuler</Button>
                        <Button type="submit" variant="contained" disabled={!formik.isValid}>Sauvegarder</Button>
                    </DialogActions>
                </form> 

      </DialogContent>
    </Dialog>
    </>

  );
};

export default EditUserDialog;
