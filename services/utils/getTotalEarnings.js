import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTotalEarnings = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('approvedTasks');
    if (!storedTasks) return '0'; 

    const approvedTasks = JSON.parse(storedTasks);

    const totalEarnings = approvedTasks.reduce((total, task) => total + task.ganancia, 0);

    return totalEarnings.toString(); 
  } catch (error) {
    console.error('Error retrieving total earnings:', error);
    return '0'; 
  }
};
