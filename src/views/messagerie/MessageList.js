import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from '../messagerie/message';

const MessageList = () => {
  const [messageData, setMessageData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchMessager();
  }, []);

  function getTokenFromCookies(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }

    return null;
  }

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

  const fetchMessager = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZjgwMTcxMDBjNGJmN2RkZDM4NWNkZSIsIk5vbSI6InlvbGRleiIsIlByZW5vbSI6IkhmYWllZGgiLCJSb2xlIjoibWFuYWdlciIsInBhc3N3b3JkIjoiJDJiJDEyJHA5UmYxLkZYRXVteWtCb3d0bUQuM2VxMGNQNHM3eUovMnZpZzB6VkRRLnBZelQwT0VvMG9pIiwiRW1haWwiOiJ5b2xkZXouaGZhaWVkaCsxNzEwQGVzZW4udG4iLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiZW1haWxUb2tlbiI6IiIsIkRlcGFydGVtZW50IjoiNjYwZjY5NmE1ZTRhNTRjMTIzMTYzYmJmIiwiX192IjowLCJyZXNldFRva2VuIjoiNjIxYjUxNWUtMTIyYS00MTY3LTk4MDctNTYxMjBkMGE2MzdmIiwiaW1hZ2UiOiIwIn0sImlhdCI6MTcxNDgzNDQwNSwiZXhwIjoxNzE0ODM4MDA1fQ.9Ss7k07BvGGX1oWdtjwaRY4o7txSNoh8MWVBYNeV_dU";
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/messaging/66322dd7de133bffac35cc82?id=66322dd7de133bffac35cc82', {
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

  return (
    <div>
      {messageData.messages && messageData.messages.map((message, index) => (
        <Message
          key={index}
          text={message.description}
          isSent={message.sender._id === currentUser}
          userImage={`http://localhost:5000${message.sender.image}`}
          userName={message.sender.Nom}
        />
      ))}
    </div>
  );
};

export default MessageList;
