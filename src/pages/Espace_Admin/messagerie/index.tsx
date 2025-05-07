
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
    <Box >
    
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        messageData?.messagingList?.map((message: Message, index: number) => (
          <Box
            key={index}
            className={`messagerie__list ${index % 3 === 0 ? 'not-seen' : ''}`}
            onClick={() =>
              userRole === "Admin" ? router.push(`/messagerie/${message?._id}`) : null
            }
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
