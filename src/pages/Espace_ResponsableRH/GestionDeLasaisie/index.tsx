// import React, { useEffect, useState } from 'react';
// import { Container, Box, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, Button } from '@mui/material';
// import { Magnify } from 'mdi-material-ui';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UpdateDialog from '../../views/ModifSupp/Edit'; // Assurez-vous d'importer le composant UpdateDialog

// interface Soldes {
//   _id: string;
//   Solde: number;
//   Annee: string;
//   User: string;
// }

// const ListeSoldes = () => {
//   const [soldes, setSoldes] = useState<Soldes[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
//   const [selectedSolde, setSelectedSolde] = useState<Partial<Soldes>>({});

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/solde/Allsolde');
//       if (response.status === 200) {
//         setSoldes(response.data);
//       } else {
//         console.error('Erreur lors de la récupération des soldes:', response);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des soldes:', error);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleUpdateClick = (solde: Soldes) => {
//     setSelectedSolde(solde);
//     setUpdateDialogOpen(true);
//   };

//   const handleUpdate = async (updatedData: Partial<Soldes>) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/solde/${selectedSolde._id}/update`, updatedData);
//       if (response.status === 200) {
//         toast.success('Solde mis à jour avec succès.');
//         setUpdateDialogOpen(false);
//         fetchData();
//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du solde:', error);
//       toast.error('Une erreur est survenue lors de la mise à jour du solde.');
//     }
//   };

//   const handleDelete = async (user: string, soldeId: string) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/solde/${user}/${soldeId}/delete`);
//       if (response.status === 200) {
//         toast.success('Solde supprimé avec succès.');
//         fetchData();
//       }
//     } catch (error) {
//       console.error('Erreur lors de la suppression du solde:', error);
//       toast.error('Une erreur est survenue lors de la suppression du solde.');
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const filteredSoldes = soldes.filter((solde) =>
//     solde.User.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <TextField
//           size="small"
//           placeholder="Rechercher par Employé"
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Magnify fontSize="small" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>
//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Solde</TableCell>
//               <TableCell>Année</TableCell>
//               <TableCell>Employé</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredSoldes.map((solde, index) => (
//               <TableRow key={index}>
//                 <TableCell>{solde.Solde}</TableCell>
//                 <TableCell>{formatDate(solde.Annee)}</TableCell>
//                 <TableCell>{solde.User}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" onClick={() => handleUpdateClick(solde)}>
//                     Modifier
//                   </Button>
//                   <Button variant="contained" onClick={() => handleDelete(solde.User, solde._id)}>
//                     Supprimer
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <UpdateDialog
//         open={updateDialogOpen}
//         handleClose={() => setUpdateDialogOpen(false)}
//         handleUpdate={handleUpdate}
//         initialData={selectedSolde}
//       />
//     </Container>
//   );
// };

// export default ListeSoldes;
"use client"
import { SyntheticEvent, useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { mdiAccountSupervisor, mdiCalendarEdit } from '@mdi/js';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'

import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports

import Icon from '@mdi/react';
import { mdiAccountGroup } from '@mdi/js';
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Ajout_users from 'src/views/InterfaceAdmin/Ajout_users'
import SaisiePresence from 'src/views/ModifSupp/PresenceMS'
import ListeSoldes from 'src/views/ModifSupp/ListeSoldesMS'
import ArchiveEdit from 'mdi-material-ui/ArchiveEdit'
// import Navigation from '../@core/layouts/components/vertical/navigation'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const PresenceSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('ListeSoldes')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='ListeSoldes'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArchiveEdit />
                <TabName>Modifier/Supprimer le solde</TabName>
              </Box>
            }
          />
          <Tab
            value='SaisiePresence'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon path={mdiCalendarEdit} size={1} />
                <TabName>Modifier/Supprimer Presence</TabName>
              </Box>
            }
          />
        

                 {/* <Tab
            value='User'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>User</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          /> */}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='ListeSoldes'>
          <ListeSoldes/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='SaisiePresence'>
          <SaisiePresence />
          </TabPanel>

          
      </TabContext>
    </Card>
  )
  
}

export default PresenceSettings


