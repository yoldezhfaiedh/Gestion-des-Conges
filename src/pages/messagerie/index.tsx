// import React, { useState } from 'react';
// import { Container, Box, Grid } from '@mui/material';
// import axios from 'axios';
// import MessageList from '../../views/messagerie/MessageList';
// import CreateMessageForm from '../../views/messagerie/CreateMessageForm';

// const IndexPage = () => {
//   const [messages, setMessages] = useState([]);

//   const handleMessageSubmit = async (newMessage) => {
//     try {
//       // Envoie de la requête pour créer un nouveau message
//       const response = await axios.post('http://localhost:5000/messaging/66322dd7de133bffac35cc82/add-response/?id=66322dd7de133bffac35cc82', newMessage);
//       // Vérifie si la requête a réussi
//       if (response.status === 200) {
//         // Mettre à jour la liste des messages avec le nouveau message créé
//         setMessages([...messages, newMessage]);
//       } else {
//         console.error('Échec de la création du message:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la création du message:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '20px' }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={8}>
//           <Box
//             sx={{
//               background: 'linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%)',
//               border: '2px solid #cccccc',
//               minHeight: '100vh',
//               paddingTop: '20px',
//             }}
//           >
//             <MessageList messages={messages} />
//             {/* Passer la fonction handleMessageSubmit en tant que prop onSubmit */}
//             <CreateMessageForm onSubmit={handleMessageSubmit} />
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           {/* Colonne latérale */}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default IndexPage;

// 'use client'
// import { Box, Grid, Typography } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import Detailsmessage from 'src/views/messagerie2/detailsmessages'

// const ViewMessage = () => {
//   const [messageData, setMessageData] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     fetchUser();
//     fetchMessager();
//   }, []);

//   function getTokenFromCookies(cookieName) {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split('; ');

//     for (const cookie of cookies) {
//       const [name, value] = cookie.split('=');
//       if (name === cookieName) {
//         return decodeURIComponent(value);
//       }
//     }

//     return null;
//   }

//   const fetchUser = async () => {
//     const token = getTokenFromCookies('token');
//     if (token) {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/Profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setCurrentUser(response.data._id);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des données utilisateur:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchMessage = async () => {
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MGExZDEzOTY1MTdjOWM5NmZlMTlhZiIsIk5vbSI6ImhmYWllZGgiLCJQcmVub20iOiJ5b2xkZXoiLCJSb2xlIjoiQWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMiRycTJGd1ZDWHA0N04vcU5uN2dCWUYuLmJIQ2JmSjV5Q1NJNFYvcG1XUmQuYkFDYm1LV0Z0aSIsIkVtYWlsIjoieW9sZGV6LmhmYWllZGgrMDMzM0Blc2VuLnRuIiwiaXNBY3RpdmUiOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImVtYWlsVG9rZW4iOiIiLCJEZXBhcnRlbWVudCI6IjY2MWQ0N2MwNzQ5ZWU5NjU3YWQyODBkNCIsIl9fdiI6MCwicmVzZXRUb2tlbiI6IjZjNzZjYTM3LWNlNTUtNDllNS04N2MwLWZjOGQ3ZTZlMmY0YyIsImltYWdlIjoiL3VwbG9hZHMvcHJvZmlsZS95b2xkZXogaGZhaWVkaC1tTDFyUHhyZS5qcGcifSwiaWF0IjoxNzE0ODQ3ODQ0LCJleHAiOjE3MTQ4NTE0NDR9.9X67SJeLh7iM4G14Hm45I2DN16wAZYx6w0hmrhXFz2U";
//         if (token) {
//             try {
//                 const response = await axios.get(`http://localhost:5000/messaging/${params.id}?id=${params.id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 console.log("Response data:", response.data); // Log the response data
//                 setMessageData(response.data);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des données de la discussion:', error);
//             }
//         }
//     };

//     fetchMessage();
// }, [params.id]);

//   const { t } = useTranslation()
//   const handleIsUpdated = () => {
//     fetchMessage()
//   }
//   return (
  
//         <Grid  spacing={1}>
//           <Grid item lg={8} xs={12} sx={{ mt: '30px', ml: '20px', mb: '10rem' }}>
//             <Typography className='title' sx={{ borderBottom: '1px solid #E5E5E5' }}>

//             </Typography>
//             <Typography
//               sx={{ fontWeight: '500', fontSize: '25px', fontFamily: 'Poppins', py: '2rem', color: '#031326' }}
//             >
//   {messageData?.object}
//             </Typography>
//             <Box marginBottom='4rem'>
//               {messageData && <Detailsmessage conversation={messageData} onActionComplete={handleIsUpdated} />}
//             </Box>
//           </Grid>
//         </Grid>
 
//   )
// }
// export default ViewMessage
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Avatar as MuiAvatar, styled } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { getUserRole } from 'src/auth.utils';
import { format } from 'date-fns';

import axios from 'axios';

interface User {
  _id: string;
  Nom: string;
  Prenom: string;
  image: string;
}

interface Participant {
  user: User;
  status: string;
}

interface Message {
  _id: string;
  users: Participant[];
  messages: any[]; // Remplacer 'any' par un type approprié si possible
  createdAt: string;
}

const Messagerie= (props: any) => {
  const router = useRouter();
  const { id } = router.query; 
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState<Message[]>([]);

  const fetchUserRole = async () => {
    try {
      const role = await getUserRole();
      setUserRole(role);
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchMessager();
  }, []);
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

  const fetchMessager = async () => {
    const token = getTokenFromCookies('token');
  
    if (token) {
      try {
        const response = await axios.get<Message[]>('http://localhost:5000/messaging', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMessageData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la discussion:', error);
      }
    }
  };

  const { t } = useTranslation();
  const Avatar = styled(MuiAvatar)({
    width: '2.375rem',
    height: '2.375rem',
    fontSize: '1.125rem',
  });

  const renderAvatarGroup = (sender: User, users: Participant[]) => {
    const allUsers = [sender, ...users.map(user => user.user)];
    const uniqueImages = new Set<string>(); // Ensemble pour stocker les URL des images uniques
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {allUsers.map((user, index) => {
          if (user && user.image && !uniqueImages.has(user.image)) {
            uniqueImages.add(user.image); // Ajouter l'URL de l'image à l'ensemble
            return (
              <Avatar
                key={index}
                alt={user?.Nom}
                src={`http://localhost:5000/${user?.image}`}
                sx={{ marginLeft: index !== 0 ? '-0.5rem' : undefined }}
              />
            );
          }
          return null; // Ne rien afficher si l'utilisateur est inexistant ou si l'image est déjà affichée
        })}
        {allUsers.length > 1 && (
          <Avatar sx={{ width: '2rem', height: '2rem', fontSize: '1rem', marginLeft: '-0.5rem' }}>
            <GroupIcon />
          </Avatar>
        )}
      </Box>
    );
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };
  const getLastMessage = (messages: any[]) => {
    if (messages.length > 0) {
      return messages[messages.length - 1].description;
    }
    return '';
  };
  
  return (
    <Box className='messagerie'>
      {!props?.noSearch && (
        <Box className='messagerie__search'>
          <TextField
            placeholder={t('Search messages')}
            variant='outlined'
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      )}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        messageData?.messagingList?.map((message: Message, index: number) => (
          <Box
          key={index}
          className={`messagerie__list ${index % 3 === 0 ? 'not-seen' : ''}`}
          onClick={() => router.push(`/messagerie/${message?._id}`)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            }
          }}
        >
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              borderBottom: '1px solid #f0f0f0',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }}
          >
            {renderAvatarGroup(message.users[0].user, message.users.slice(1))}
            <Box ml={2} flex="1">
              <Typography variant="subtitle1">
                {`${message?.users[0]?.user?.Nom} ${message?.users[0]?.user?.Prenom}`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>
                {getLastMessage(message.messages)}
              </Typography>
            </Box>
            <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
    {formatDate(message?.createdAt)}
  </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Messagerie;
