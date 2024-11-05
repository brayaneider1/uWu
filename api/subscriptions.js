import axios from 'axios';

const apiUrl = 'https://backend-uwu.vercel.app/v1';

export const getSubscriptionByUser = async (userId) => {
  console.log("🚀 ~ getSubscriptionByUser ~ userId:", userId)
  try {
    const response = await axios.get(`${apiUrl}/subscriptions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error in subscription:', error);
    throw error;
  }
};


export const getSubscriptorsByCode = async (code) => {
  console.log("🚀 ~ getSubscriptorsByCode ~ code:", code)
  try {
    const response = await axios.get(`${apiUrl}/subscriptions/referrer/${code}`);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    return response.data;
  } catch (error) {
    console.error('Error in subscription:', error);
    throw error;
  }
};


export const updateSubscription = async (userId, planId) => {
  try {
    const response = await axios.put(`${apiUrl}/subscriptions/${userId}`, { planId: planId });
    return response.data;
  } catch (error) {
    console.error('Error in update subscription:', error);
    throw error;
  }
};
