import React, { useState, useEffect, Fragment, ReactNode } from 'react';
import axios from 'axios';
import { Box, IconButton, Button, Menu as MuiMenu, MenuItem as MuiMenuItem, Typography, Avatar as MuiAvatar,Paper, Chip, styled, Theme, useMediaQuery } from '@mui/material';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import BellOutline from 'mdi-material-ui/BellOutline';

// ** Styles pour PerfectScrollbar
const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0,
  },
};

const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
});

const Message = ({ text, isSent, userImage, userName }) => {
    
    const messageContainerStyle = {
      display: 'flex',
      flexDirection: 'column', // Organize elements in a column
      alignItems: isSent ? 'flex-end' : 'flex-start', // Align content to the right for sent messages and to the left for received messages
      marginBottom: '10px',
    };
  
    const messageStyle = {
      maxWidth: '70%',
      margin: '5px 10px',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: isSent ? '#DCF8C6' : '#EAEAEA',
    };
  
    const avatarStyle = {
      marginLeft: isSent ? '10px' : '0', // Add margin-left for sent messages
      marginRight: isSent ? '0' : '10px', // Add margin-right for received messages
    };
  
    return (
      <div style={messageContainerStyle}>
        <Typography variant="caption">{userName}</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSent && <Avatar src={userImage} style={avatarStyle} />} {/* Position avatar to the left for received messages */}
          <Paper elevation={3} style={messageStyle}>
            <Typography variant="body1">{text}</Typography>
          </Paper>
          {isSent && <Avatar src={userImage} style={avatarStyle} />} {/* Position avatar to the right for sent messages */}
        </div>
      </div>
    );
  };



export default Message;
