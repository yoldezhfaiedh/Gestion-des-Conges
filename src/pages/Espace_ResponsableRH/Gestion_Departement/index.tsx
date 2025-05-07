
import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog'; // Importez le composant Dialog
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Field, Formik, useFormik } from 'formik';
import AjoutDepartement from 'src/views/Departement/Ajout_departement';
import ListeDepartement from 'src/views/Departement/Afficher_departement';


const SaisieDepartement = () => {
    const [value, setValue] = useState<string>('2');
    

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                    <Tab value='1' label='Ajout departement' />
                    <Tab value='2' label='liste departement ' />
                </TabList>
                <CardContent>
                    <TabPanel value='1' sx={{ p: 0 }}>
                       <AjoutDepartement></AjoutDepartement>
                    </TabPanel>
                    <TabPanel value='2' sx={{ p: 0 }}>
                        <ListeDepartement></ListeDepartement>
                    </TabPanel>
                </CardContent>
            </TabContext>
        
</Card>
)}
export default SaisieDepartement
