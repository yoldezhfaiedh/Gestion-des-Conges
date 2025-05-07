import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface UpdateDialogProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (updatedData: Partial<Soldes>) => void;
  initialData: Partial<Soldes>;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, handleClose, handleUpdate, initialData }) => {
  const [updatedData, setUpdatedData] = useState<Partial<Soldes>>(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleConfirm = () => {
    handleUpdate(updatedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifier le solde</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          id="Solde"
          name="Solde"
          label="Solde"
          value={updatedData.Solde || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="Annee"
          name="Annee"
          label="Année"
          value={updatedData.Annee || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="User"
          name="User"
          label="Employé"
          value={updatedData.User || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Annuler
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
