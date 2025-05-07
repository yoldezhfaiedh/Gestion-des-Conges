import React from 'react';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const CreateMessageForm = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = getTokenFromCookies('token');
      if (!token) {
        console.error("Token non trouvé");
        return;
      }
      const response = await axios.post(`http://localhost:5000/messaging/66322dd7de133bffac35cc82/add-response/?id=66322dd7de133bffac35cc82`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        onSubmit(values); // Appel de la fonction onSubmit avec les valeurs du formulaire
        console.log('Message créé avec succès');
        resetForm();
      } else {
        console.error('Échec de la création du message:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la création du message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getTokenFromCookies = (cookieName) => {
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

  return (
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
  );
};

export default CreateMessageForm;
