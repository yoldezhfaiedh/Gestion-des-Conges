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
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomToast from 'src/@core/components/Alerts/CustomToast';
import DepartementDropdown from './DepartementDropDown';

interface User {
  id: string;
  Nom: string;
  Prenom: string;
  Email: string;
  Role: string | null; 
  Departement : string| null; 
}

interface Props {
  open: boolean;
  handleClose: () => void;
  user: User | null;
}

const EditUtilisateur: React.FC<Props> = ({ open, handleClose, user }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);
  const notify = (message: string) => {
    toast(message);
  };
  const formik = useFormik({
    initialValues: {
      Role: editedUser?.Role || '', // Valeur initiale pour le champ Role
      Departement: editedUser?.Departement || '', // Valeur initiale pour le champ departement
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`http://localhost:5000/users/${editedUser._id}?id=${editedUser._id}`, values);
        if (response.status === 200) {
          notify("La mise à jour a été effectuée avec succès.");
          handleClose();
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    },
      
  });

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setEditedUser(prevState => ({
        ...prevState!,
        [name]: value,
      }));
      formik.setFieldValue(name, value); // Mettre à jour la valeur du champ dans formik.values
    }
  };
  

  return (
    <>
    <CustomToast />
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifier l'utilisateur</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}> {/* Utilisez le formulaire de Formik */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
  name="Role"
  id="Role"
  value={formik.values.Role}
  onChange={formik.handleChange}
>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Responsable Rh">Responsable Rh</MenuItem>
                  <MenuItem value="Employe">Employé</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <DepartementDropdown formik={formik} />
          </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" color="primary">Enregistrer les modifications</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
    </>

  );
};

export default EditUtilisateur;
