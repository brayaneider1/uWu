import React, { useEffect, useState } from 'react';
import { VStack } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import { getTaskAssigmentsByUser, updateTaskAssigmentState } from '../../../api/tasksAssigments';
import useAuthStore from '../../../store/useAuthStore';
import TabCard from './TabCard'; // Import the TabCard component
import renderTabBar from './renderTabBar'; // Import renderTabBar from another file

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthStore();
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [reload, setReload] = useState(true)

  useEffect(() => {
    const fetchTaskAssignments = async () => {
      setLoading(true);
      try {
        const data = await getTaskAssigmentsByUser(user?.sub);
        setTaskAssignments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setReload(false)
      }
    };

    fetchTaskAssignments();
  }, [user, reload]);

  const categorizeTasks = () => {
    return {
      inProgress: taskAssignments.filter(task => task.state === 'ACCEPTED'),
      sent: taskAssignments.filter(task => task.state === 'COMPLETED'),
      finished: taskAssignments.filter(task => task.state === 'REVIEW_APPROVED'),
      rejected: taskAssignments.filter(task => task.state === 'REVIEW_REJECTED'),
    };
  };

  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'inProgress', title: 'En Progreso' },
    { key: 'sent', title: 'Enviadas' },
    { key: 'finished', title: 'Terminadas' },
    { key: 'rejected', title: 'Rechazadas' },
  ];

  const renderScene = SceneMap({
    inProgress: () => <TabCard handleSubmit={handleSubmit} tasks={categorizeTasks().inProgress} />,
    sent: () => <TabCard handleSubmit={handleSubmit} tasks={categorizeTasks().sent} />,
    finished: () => <TabCard handleSubmit={handleSubmit} tasks={categorizeTasks().finished} />,
    rejected: () => <TabCard handleSubmit={handleSubmit} tasks={categorizeTasks().rejected} />,
  });




  const handleSubmit = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await updateTaskAssigmentState(taskId, 'COMPLETED');
    } catch (error) {
      console.error('Error creating task assignment:', error);
      setError(error);
    } finally {
      setReload(true);
      setLoading(false);
    }
  };

  return (
    <VStack flex={1} bg="primaryBg">
      {loading && <LoadingOverlay />}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}

      />
    </VStack>
  );
};

export default Tasks;
