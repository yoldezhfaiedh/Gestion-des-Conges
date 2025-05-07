import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Button, Typography, TextField } from '@mui/material';
import { Alert, AlertColor } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import Message from 'src/views/messagerie/message';

const Conversation = (props: any) => {
  const [conversation, setConversation] = useState<any>(null);
  const [richText, setRichText] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const router = useRouter();
  const { id } = router.query; // Récupérer l'ID de la conversation depuis l'URL
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = getTokenFromCookies('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/auth/Profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data._id);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    }
  };

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
    const fetchConversation = async () => {
      const token = getTokenFromCookies('token');
  
      try {
        if (!token || !id) {
          throw new Error('Token ou ID non disponibles');
        }
  
        const response = await axios.get(`http://localhost:5000/messaging/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setConversation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la conversation:', error);
        // Gérer les erreurs de récupération de la conversation
      }
    };
  
    // Appeler fetchConversation immédiatement
    fetchConversation();
  
    // Définir un intervalle pour récupérer périodiquement la conversation
    const intervalId = setInterval(fetchConversation, 1000); // Répétition toutes les 5 secondes
  
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'ID de la conversation change
    return () => clearInterval(intervalId);
  }, [id]);

 const handleSubmit = async (values: { description: string }) => {
  try {
    const token = getTokenFromCookies('token');
    if (!token || !conversation) {
      throw new Error("Token ou conversation non disponibles");
    }

    const response = await axios.post(`http://localhost:5000/messaging/${conversation._id}/add-response?id=${conversation._id}`, {
      // objet: 'RE: ' + conversation.object,
      description: values.description
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.data.success==='true') {
      setToastType('success');
      setOpenToast(true);
      setToastMessage(response.data.message);
      setRichText('');
      props.onActionComplete();
    } else {
      setToastType('error');
      setOpenToast(true);
      setToastMessage(response.data.message); 
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la réponse:', error);
    setToastType('error');
    setOpenToast(true);
    setToastMessage('Une erreur est survenue');
  }
};


  const mapToastTypeToSeverity = (type: string): AlertColor => {
    switch (type) {
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const handleClose = () => {
    setOpenToast(false);
  };

  return (
    <Box>
      <div>
        {conversation?.messages && conversation.messages.map((message: any, index: number) => (
          <Message
            key={index}
            text={message.description}
            isSent={message.sender._id === currentUser}
            userImage={`http://localhost:5000${message.sender.image}`}
            userName={message.sender.Nom}
          />
        ))}
      </div>
      <Formik
        initialValues={{ description: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ marginTop: '20px' }}>
            <Field
              name="description"
              as={TextField}
              label="Type your message"
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }} disabled={isSubmitting}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert onClose={handleClose} severity={mapToastTypeToSeverity(toastType)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Conversation;
