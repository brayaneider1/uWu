import axios from 'axios';

const apiUrl = 'https://backend-uwu.vercel.app/v1';

export const getWalletByUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/wallet/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error in wallet:', error);
    throw error;
  }
};



export const createWallet = async (userId) => {
  try {
    const response = await axios.post(`${apiUrl}/wallet//${userId}/create`);
    return response.data;
  } catch (error) {
    console.error('Error in update payment proof:', error);
    throw error;
  }
};