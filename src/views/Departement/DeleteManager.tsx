import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';

interface Departement {
  _id: string;
  NomDepartement: string;
  UserEmail: string;
}
interface FormValues {
    EmailUser: string;
  }
interface Props {
  open: boolean;
  handleClose: () => void;
  departement: Departement | null;
}

const SupprimerManagerDialog: React.FC<Props> = ({ open, handleClose, departement }) => {
  const [editedDepartement, setEditedDepartement] = useState<Departement | null>(null);
  const initialValues: FormValues = {
    EmailUser: "",
  }
  useEffect(() => {
    if (departement) {
      setEditedDepartement(departement);
    }
  }, [departement]);

  const notify = (message: string) => {
    toast(message);
  };


  const formik = useFormik({
    initialValues,
    onSubmit: async (formValues) => {
      try {
        if (editedDepartement) {
          const response = await axios.post(`http://localhost:5000/departement/${editedDepartement._id}/RemoveManager?departementId=${editedDepartement._id}`, formValues);
          
          if (response.status === 201) {
            notify(response.data);
            handleClose();
          }
          else {            notify("Une erreur s'/est produite. Veuillez réessayer.");
        }
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    },
  });
  
  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setEditedDepartement(prevState => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <CustomToast />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="EmailUser">Manager</InputLabel>
                  <TextField
                    id="EmailUser"
                    name="EmailUser"
                    label="Manager"
                    type="email"
                    value={formik.values.EmailUser}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" color="primary" onClick={formik.handleSubmit}>Supprimer le Manager</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupprimerManagerDialog;
