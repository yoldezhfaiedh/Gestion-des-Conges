import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function DepartementDropdown({ formik }) {
    const [leaveDepartement, setLeaveDepartement] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/Departement')  
            .then(response => {
                setLeaveDepartement(response.data);
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
            <InputLabel id="Departement-label">Departement</InputLabel>
            <Select
                labelId="Departement-label"
                id='Departement'
                name="Departement"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Departement}
                label="Département"
            >
                {leaveDepartement.map((departement) => (
                    <MenuItem key={departement._id} value={departement.NomDepartement}>
                        {departement.NomDepartement}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default DepartementDropdown;
