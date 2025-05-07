import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const imageStyles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'cover',
  marginTop: '0.25rem'
};

const Detailsmessage = ({ conversation, onActionComplete }) => {
  return (
    <Box>
  {conversation?.messages && conversation.messages.map((message, index) => (
        <Box key={index} style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Image
              src={
                message?.sender?.image
                  ? `http://localhost:5000/` + message?.sender?.image
                  : '/image/team1.png'
              }
              alt={`Image de profil de ${message?.sender?.Nom}`}
              width={40}
              height={40}
              style={imageStyles}
            /> */}
            <Box style={{ marginLeft: '1rem' }}>
              <Typography className='conversationName'>
                {message?.sender?.firstName + ' ' + message?.sender?.Prenom}
              </Typography>
              <Typography className='conversationMessage'>{message?.object}</Typography>
            </Box>
            <Box style={{ marginLeft: 'auto' }}>
              <Typography className='conversationTime'> {(message?.createdAt)}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography className='conversationBody'>{message?.description}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Detailsmessage;
