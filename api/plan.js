import axios from 'axios';

const apiUrl = 'https://uwu-eight.vercel.app/v1';

export const getPlans = async () => {
  try {
    const response = await axios.get(`${apiUrl}/plan`);


    return response;
  } catch (error) {
    console.error('Error in plan:', error);
    throw error;
  }
};

export const getPlanByUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/plan/${userId}`);

    return response.data;
  } catch (error) {
    console.error('Error in apiLogin:', error);
    throw error;
  }
};


export const getTasksByPlan = async (planId) => {
  try {
    const response = await axios.get(`${apiUrl}/tasks/${planId}/tasks`);

    return response.data;
  } catch (error) {
    console.error('Error in getTasks:', error);
    throw error;
  }
};
