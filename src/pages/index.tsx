
import MyCalendar from '../views/messagerie/calendrierCom';
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
    const title = window.prompt('Entrez le titre du rendez-vous :');
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
