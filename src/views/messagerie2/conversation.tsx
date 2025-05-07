// import React, { useMemo, useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import Dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { Alert, Box, Button, Snackbar } from '@mui/material';
// import { getCookie } from 'cookies-next';
// import axios from 'axios';

// const imageStyles: React.CSSProperties = {
//   borderRadius: '50%',
//   width: '2.5rem',
//   height: '2.5rem',
//   objectFit: 'cover',
//   marginTop: '0.25rem',
// };

// interface Message {
//   sender: {
//     firstName: string;
//     lastName: string;
//     image: string;
//   };
//   object: string;
//   description: string;
//   createdAt: string;
// }

// const Conversation: React.FC = () => {
//   const [richText, setRichText] = useState<string>('');
//   const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
//   const [conversation, setConversation] = useState<Message[]>([]);
//   const token = getCookie('token');

//   const [openToast, setOpenToast] = useState<boolean>(false);
//   const [toastMessage, setToastMessage] = useState<string>('');
//   const [toastType, setToastType] = useState<string>('success');

//   useEffect(() => {
//     // Récupérer les messages depuis l'API
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get<{ messages: Message[] }>('http://localhost:5000/messages', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setConversation(response.data.messages);
//       } catch (error) {
//         console.error('Une erreur est survenue lors de la récupération des messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [token]);

//   const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenToast(false);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Logique de soumission de réponse à la conversation
//   };

//   return (
//     <Box>
//       {conversation.map((message, index) => (
//         <Box key={index}>
//           <Box borderBottom='1px solid #E5E5E5' style={{ cursor: 'pointer' }} padding='15px'>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Image
//   src={message.sender.image ? `http://localhost:5000/${message.sender.image}` }
//   alt={`Image de profil de ${message.sender.Nom}`}
//                 width={40}
//                 height={40}
//                 style={imageStyles}
//               />
//               <Box style={{ marginLeft: '1rem' }}>
//                 <Typography className='conversationName'>
//                   {message.sender.firstName + ' ' + message.sender.Prenom}
//                 </Typography>
//                 <Typography className='conversationMessage'>{message.object}</Typography>
//               </Box>
//               <Box style={{ marginLeft: 'auto' }}>
//                 <Typography className='conversationTime'>{(message.createdAt)}</Typography>
//               </Box>
//             </Box>
//             <Box>
//               {(selectedMessage === index || index === conversation.length - 1) && (
//                 <Box className='conversation__body'>
//                   <Typography className='conversationBody' dangerouslySetInnerHTML={{ __html: message.description }}></Typography>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       ))}
//       <form autoComplete='off' onSubmit={handleSubmit} action=''>
//         <Box mt='25px'>
//           <Button
//             type='submit'
//             variant='contained'
//             color='primary'
//             className='button'
//             sx={{ padding: '10px 50px !important' }}
//           >
//             <Typography className='button__typo'>REPONDRE</Typography>
//           </Button>
//         </Box>
//       </form>
//       <Snackbar
//         open={openToast}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <Alert onClose={handleClose} severity={toastType} sx={{ width: '100%' }}>
//           {toastMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Conversation;
