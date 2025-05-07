// import React, { useEffect, useState } from 'react';
// import { Container, Box, Button, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, TextField } from '@mui/material';
// import axios from 'axios';
// import { Magnify } from 'mdi-material-ui';
// import EditUserDialog from 'src/views/InterfaceAdmin/EditUser';

// interface User {
//   id: number;
//   Nom: string;
//   Prenom: string;
//   Email: string;
//   Role: string;
//   isActive: boolean;
// }

// const Liste = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
//   const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null)

//   useEffect(() => {
//     fetchData();
//   }, []);

// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/users", {

//       // headers: {
//       //   Authorization: `Bearer ${token}`
//       // }
//     });
//     if (response.status === 200) {
//       setUsers(response.data);
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération des utilisateurs:', error);
//   }
// };


//   const handleBlockUnblock = async (Email: string, isActive: boolean) => {
//     try {
//       const response = await axios.post(
//         isActive ? "http://localhost:5000/users/block" : "http://localhost:5000/users/unblock",
//         { Email }
//       );
//       if (response.status === 200) {
//         setUsers(prevUsers =>
//           prevUsers.map(user => {
//             if (user.Email === Email) {
//               return { ...user, isActive: !isActive };
//             }
//             return user;
//           })
//         );
//       }
//     } catch (error) {
//       console.error('Erreur :', error);
//     }
//   };

//   const handleButtonClick = (Email: string, isActive: boolean) => {
//     handleBlockUnblock(Email, isActive);
//     setUsers(prevUsers =>
//       prevUsers.map(user => {
//         if (user.Email === Email) {
//           return { ...user, isActive: !isActive };
//         }
//         return user;
//       })
//     );
//   };

//   const handleDelete = async (email: string) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/users/${email}`);
//       if (response.status === 200) {
//         setUsers(prevUsers => prevUsers.filter(user => user.Email !== email));
//       }
//     } catch (error) {
//       console.error(`Erreur lors de la suppression de l'utilisateur ${email}:`, error);
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };
//   const filteredUsers = Array.isArray(users) ? 
//   users.filter(user => user.Nom.toLowerCase().includes(searchTerm.toLowerCase())) : [];
//   const openEditDialog = (user: User) => {
//     setSelectedUserForEdit(user);
//     setIsEditDialogOpen(true);
//   };

//   const closeEditDialog = () => {
//     setIsEditDialogOpen(false);
//     setSelectedUserForEdit(null);
//   };

//   return (
//     <Container>
//       <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
//           <TextField
//             size='small'
//             sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }  }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position='start' >
//                   <Magnify fontSize='small' />
//                 </InputAdornment>
//               )
//             }}
//             placeholder="Rechercher par Nom"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </Box>
//       </Box>
//       <Box>
//         <Box p="4" display="flex" justifyContent="space-between" marginTop="15px">
//           {/* <Typography variant="h4" fontWeight="bold">
//             Liste des Utilisateurs
//           </Typography> */}
//         </Box>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nom</TableCell>
//                 <TableCell>Prénom</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Statut</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredUsers.map((user, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{user.Nom}</TableCell>
//                   <TableCell>{user.Prenom}</TableCell>
//                   <TableCell>{user.Email}</TableCell>
//                   <TableCell>{user.Role}</TableCell>
//                   <TableCell>{user.isActive ? 'Actif' : 'Inactif'}</TableCell>
//                   <TableCell>
//                   <Button onClick={() => handleButtonClick(user.Email, user.isActive)}>
//                       {user.isActive ? 'Bloquer' : 'Débloquer'}
//                     </Button>
//                     <Button onClick={() => openEditDialog(user)}>Modifier</Button>
//                     <Button onClick={() => handleDelete(user.Email)}>Supprimer</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <EditUserDialog open={isEditDialogOpen} handleClose={closeEditDialog} user={selectedUserForEdit} />
//     </Container>
//   );
// };

// // export default Liste;
// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import Badge from '@mui/material/Badge';
// import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
// import CheckIcon from '@mui/icons-material/Check';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import { isSameDay } from 'date-fns';

// function Calendar() {
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]); // State for selected dates
//   const [markedDates, setMarkedDates] = useState<Date[]>([]); // State for marked dates
//   const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
//   const [dateDetails, setDateDetails] = useState<string>(''); // State for date details

//   const handleDateSelection = (date: Date) => {
//     setSelectedDates(prevDates => {
//       const index = prevDates.findIndex(prevDate => prevDate.getTime() === date.getTime());
//       if (index === -1) {
//         return [...prevDates, date];
//       } else {
//         return prevDates.filter(prevDate => prevDate.getTime() !== date.getTime());
//       }
//     });
//     fetchDateDetails(date); // Fetch details for the selected date
//   };

//   const handleOpenDialog = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/dates/details', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ Date: selectedDates[0] }), // Assuming you're selecting only one date
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch date details');
//       }
//       const data = await response.json();
//       setDateDetails(data.userEmails); // Assuming the response has a property `userEmails` for the details
//       setDialogOpen(true);
//     } catch (error) {
//       console.error('Error fetching date details:', error);
//       setDialogOpen(false);
//       setDateDetails('');
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   const fetchMarkedDates = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/dates/marked');
//       const data: { date: string }[] = await response.json();
//       setMarkedDates(data.map(item => new Date(item.date)));
//     } catch (error) {
//       console.error('Error fetching marked dates from backend:', error);
//     }
//   };

//   const fetchDateDetails = async (date: Date) => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const response = await fetch(`http://localhost:5000/dates/details?date=${formattedDate}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch date details');
//       }
//       const data = await response.json();
//       setDateDetails(data);
//     } catch (error) {
//       console.error('Error fetching date details from backend:', error);
//       setDateDetails('');
//     }
//   };

//   useEffect(() => {
//     fetchMarkedDates();
//   }, []);

//   const saveSelectedDates = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/Dates/marked-date', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ Date: selectedDates[0] }), // Assuming you're selecting only one date
//       });
//       setMarkedDates(prevMarkedDates => [...prevMarkedDates, ...selectedDates]);
//     } catch (error) {
//       console.error('Error sending selected dates to backend:', error);
//     }
//   };

//   const isDateMarked = (date: Date) => {
//     return markedDates.some(markDate => isSameDay(markDate, date));
//   };

//   const customDayRenderer = (
//     date: Date,
//     selectedDays: Array<Date | null>,
//     pickersDayProps: PickersDayProps<Date>
//   ) => {
//     const selected = selectedDays.some(day => isSameDay(day, date));
//     return (
//       <PickersDay
//         {...pickersDayProps}
//         selected={selected}
//         sx={{
//           '&.MuiPickersDay-day': {
//             width: '500px', // Adjust the width as needed
//             height: '40px', // Adjust the height as needed
//           },
//         }}
//       />
//     );
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div>
//         <StaticDatePicker
//           orientation='portrait'
//           value={selectedDates}
//           onChange={handleDateSelection}
//           date={null}
//           renderDay={customDayRenderer}
//         />
//         <Button onClick={handleOpenDialog}>Show Details</Button>
//         <Button onClick={saveSelectedDates}>Save Marked Dates</Button>
//       </div>
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Les employés ayant pris un congé à cette date</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {dateDetails && (
//               <div>
//                 <div>User Emails:</div>
//                 <ul>
//                   {dateDetails.map((email, index) => (
//                     <li key={index}>{email}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} autoFocus>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </LocalizationProvider>
//   );
// }

// export default Calendar;
import MyCalendar from '../../views/messagerie/calendrierCom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  const getTokenFromCookies = (cookieName: string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) {
        return decodeURIComponent(value);
      }
    }

    return null;
  };

  useEffect(() => {
    // Appel API pour récupérer les rendez-vous marqués
    axios.get('http://localhost:5000/dates/getappointments')
      .then(response => {
        // Convert date strings to Date objects
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      });
  }, []);
  
  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt(' Laissez une note :');
    if (title) {
      const newEvent = {
        start,
        end,
        title,
      };
  
      const token = getTokenFromCookies('token');
  
      try {
        if (!token) {
          throw new Error('Token non disponible');
        }
  
        // Convert date strings to Date objects
        newEvent.start = new Date(newEvent.start);
        newEvent.end = new Date(newEvent.end);
  
        const response = await axios.post(`http://localhost:5000/dates/appointments`, newEvent, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
  
        // Convert date strings to Date objects for the newly added event
        response.data.start = new Date(response.data.start);
        response.data.end = new Date(response.data.end);
  
        setEvents([...events, response.data]);
        console.log('Rendez-vous ajouté avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du rendez-vous:', error);
      }
    }
  };
  

  return (
    <div>
      <MyCalendar events={events} onSelectSlot={handleSelectSlot} />
    </div>
  );
};

export default CalendarPage;
