import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function LeaveTypeDropdown({ formik }) {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/typeDemande')  
            .then(response => {
                setLeaveTypes(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des types de congé:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="typeCongeNom-label">Type de congé</InputLabel>
            <Select
                labelId="typeCongeNom-label"
                id="typeCongeNom"
                name="typeCongeNom"
                value={formik.values.typeCongeNom}
                onChange={formik.handleChange}
                label="Type de congé"
            >
                {leaveTypes.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                        {type.Nom}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default LeaveTypeDropdown;
