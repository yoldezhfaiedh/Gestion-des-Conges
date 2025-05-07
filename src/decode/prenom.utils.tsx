import Cookies from 'js-cookie';

import axios from 'axios';

export const getUserPrenom = async () => {
    try {
        // Retrieve the token from local storage
        const token = Cookies.get('token'); // Use the correct cookie name
    
        if (!token) {
          // Handle case where token is not found in local storage
          console.error('Token not found in local storage');
          return;
        }
    
        // Construct the authorization headers
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        // Make a GET request with axios
        const response = await axios.get('http://localhost:5000/auth/user-prenom', { headers });
    
        // Process the response
        console.log('Data:', response.data);
    
      if (response.status === 200) {
        return response.data.Role; 
      } else {
        console.error('Error fetching user Prenom:', response.statusText);
        return 'user'; 
      }
    } catch (error) {
      console.log('Error fetching user Prenom');
      return 'user'; 
    }
}
    
