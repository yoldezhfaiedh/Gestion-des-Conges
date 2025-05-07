import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Avatar as MuiAvatar, styled } from '@mui/material';

const localizer = momentLocalizer(moment);

const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
});

const MyCalendar = ({ events, onSelectSlot }) => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start" 
      endAccessor="end" 
      selectable
      onSelectSlot={onSelectSlot}
      components={{
        event: EventComponent,
      }}
    />
  </div>
);

const EventComponent = ({ event }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {event.User && event.User.image && (
        <Avatar alt={event.User.Nom} src={`http://localhost:5000/${event.User.image}`} />
      )}
      <span>{event.User.Prenom}</span>
      <span style={{ marginLeft: '10px' }}></span> {/* Espace entre le prénom et le titre */}
      <div>
        <strong>{event.title}</strong>
      </div>
    </div>
  );
  

export default MyCalendar;
