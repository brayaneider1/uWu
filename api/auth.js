import axios from 'axios';

const BASE_URL = 'https://uwu-eight.vercel.app/v1';

export const apiLogin = async (phone, password) => {
  try {
    const formData = {
      phone_number: phone,
      password: password,
    };
    const response = await axios.post(`${BASE_URL}/auth/signin`, formData);
    return response.data;
  } catch (error) {
    console.error('Error in apiLogin:', error);
    throw error;
  }
};

export const apiRegister = async (
  name,
  email,
  phone,
  password,
  referralCode
) => {
  try {
    const formData = {
      name: name,
      email: email,
      phone_number: phone,
      password: password,
      referral_code: referralCode,
    };

    
    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
    return response.data;
  } catch (error) {
    console.error('Error in apiRegister:', error);
    throw error;
  }
};
