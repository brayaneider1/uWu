import axios from 'axios';

export const loginService = async (userCredentials) => {
  try {
    const response = await axios.post('http://localhost:3000/v1/auth/signin', userCredentials);
    return response.data;
  } catch (error) {
    console.error('Error during the login:', error);
    throw error;
  }
};

