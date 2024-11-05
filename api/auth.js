import axios from 'axios';

const BASE_URL = 'https://backend-uwu.vercel.app/v1';

export const apiLogin = async (phone, password) => {
  try {
    const formData = {
      phone_number: phone,
      password: password,
    };
    const response = await axios.post(`${BASE_URL}/auth/signin`, formData);
    console.log("🚀 ~ apiLogin ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error in apiLogin:', error);
    throw error;
  }
};

export const apiRegister = async (
  name,
  email,
  phoneNumber,
  password,
  referralCode
) => {
  try {
    const formData = {
      name: name,
      email: email,
      phone_number: phoneNumber,
      password: password,
      referral_code: referralCode,
    };

    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado que no está en el rango de 2xx
      console.error('Error en la respuesta:', error.response.data);
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo ocurrió al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};

