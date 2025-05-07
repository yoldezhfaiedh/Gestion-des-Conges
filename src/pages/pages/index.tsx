import React, { useMemo, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Dynamic from 'next/dynamic';
import Image from 'next/image';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const imageStyles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'cover',
  marginTop: '0.25rem',
};

const CConversation = (props) => {
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), []);
  const [richText, setRichText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [conversation, setConversation] = useState(props.conversation || []);
  const token = getCookie('token');

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    setConversation(props.conversation || []);
  }, [props.conversation]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/messaging/66322dd7de133bffac35cc82/add-response/?id=66322dd7de133bffac35cc82`,
        {
          objet: 'RE: ' + conversation.object,
          description: richText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setToastType('success');
        setOpenToast(true);
        setToastMessage('Action effectuée avec succès');
        setRichText('');
        props.onActionComplete();
      } else {
        setToastType('error');
        setOpenToast(true);
        setToastMessage('Une erreur est survenue');
      }
    } catch (error) {
      setToastType('error');
      setOpenToast(true);
      setToastMessage('Une erreur est survenue');
    }
  };

  return (
    <Box>
      {conversation.messages.map((message, index) => (
        <Box key={index}>
          <Box
            borderBottom='1px solid #E5E5E5'
            style={{ cursor: 'pointer' }}
            padding='15px'
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  message.sender.image
                    ? `${process.env.NEXT_PUBLIC_API_WITHOUT}${message.sender.image}`
                    : '/image/team1.png'
                }
                alt={`Image de profil de ${message.sender.firstName}`}
                width={40}
                height={40}
                style={imageStyles}
              />
              <Box style={{ marginLeft: '1rem' }}>
                <Typography className='conversationName'>
                  {message.sender.firstName + ' ' + message.sender.lastName}
                </Typography>
                <Typography className='conversationMessage'>{message.object}</Typography>
              </Box>
              <Box style={{ marginLeft: 'auto' }}>
                <Typography className='conversationTime'> {formatDate(message.createdAt)}</Typography>
              </Box>
            </Box>

            <Box>
              {(selectedMessage === index || index === conversation.messages.length - 1) && (
                <Box className='conversation__body'>
                  <Typography
                    className='conversationBody'
                    dangerouslySetInnerHTML={{ __html: message.description }}
                  ></Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ))}
      <form autoComplete='off' onSubmit={handleSubmit} action=''>
        <ReactQuill value={richText} onChange={setRichText} style={{ minHeight: '20px' }} />
        <Box mt='25px'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'
            sx={{ padding: '10px 50px !important' }}
          >
            <Typography className='button__typo'>REPONDRE</Typography>
          </Button>
        </Box>
      </form>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} severity={toastType} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CConversation;
