import axios from 'axios';

const apiUrl = 'https://backend-uwu.vercel.app/v1';

export const getTaskAssigmentsByUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/task-assignments/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error in subscription:', error);
    throw error;
  }
};


export const getSubscriptorsByCode = async (code) => {
  try {
    const response = await axios.get(`${apiUrl}/subscriptions/referrer/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error in subscription:', error);
    throw error;
  }
};

export const createTaskAssignment = async ({ taskId, userId, dueDate, attachment }) => {
  try {
    const response = await axios.post(`${apiUrl}/task-assignments`, {
      task:taskId,
      user:userId,
      dueDate,
      attachment,
    });
    return response.data;
  } catch (error) {
    console.error('Error in create task assignment:', error);
    throw error;
  }
};


export const updateTaskAssigmentState = async (assignmentId, newState) => {
  try {
    const response = await axios.put(`${apiUrl}/task-assignments/${assignmentId}/state`, { newState:newState+"" });
    return response.data;
  } catch (error) {
    console.error('Error in update assigment:', error);
    throw error;
  }
};
