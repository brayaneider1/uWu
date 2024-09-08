import React, { useEffect, useState, useCallback } from 'react';
import { VStack, Text, Icon, Flex, ScrollView, Box, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, ImageBackground } from 'react-native';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import useAuthStore from '../../../store/useAuthStore';
import { getSubscriptionByUser } from '../../../api/subscriptions';
import { getTasksByPlan } from '../../../api/plan';
import { PressableScale } from '../../../components/PressableScale/PressableScale';
import { getTaskAssigmentsByUser, createTaskAssignment } from '../../../api/tasksAssigments';

const TaskCard = ({ item, index, handleAction, isAssigned, subscriptionData }) => {
    // Componente para manejar el renderizado de cada tarjeta de tarea
    return (

        <Box my={2} bg='#293751' key={`task-${index}`} opacity={0.8} flex={1} p={4} rounded="lg">
            <Flex direction="column" justifyContent="space-between">
                <Flex direction="row" justify="space-between" align="center">
                    <Text color="white" fontWeight={400}>
                        Restantes {index + 1}
                    </Text>
                    <PressableScale
                        onPress={() => handleAction(item.task_id)}
                        size="xs"
                        bg={isAssigned ? 'gray.500' : 'secondaryGreen'}
                        rounded="lg"
                        color="black"
                        px={5}
                        isDisabled={isAssigned}
                    >
                        <Text>{isAssigned ? 'Inscrito' : 'Inscribir'}</Text>
                    </PressableScale>
                </Flex>
                <Text color="white" fontWeight={400}>
                    Total de demanda: {index + 1}
                </Text>
                <Flex direction="row" justify="space-between" align="center">
                    <Text color="white" fontWeight={400}>
                        {item.description} {index + 1}
                    </Text>
                    <Text color="green.500">
                        <Text fontWeight={400}>Ganancia:</Text>{' '}
                        {subscriptionData?.plan?.credits_per_task}$
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

const TasksPlan = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const [subscriptionData, setSubscriptionData] = useState({});
    console.log("🚀 ~ TasksPlan ~ subscriptionData:", subscriptionData)
    const [taskAssignments, setTaskAssignments] = useState([]);
    console.log("🚀 ~ TasksPlan ~ taskAssignments:", taskAssignments)
    const [tasks, setTasks] = useState([]);
    console.log("🚀 ~ TasksPlan ~ tasks:", tasks)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(false);
    const { width } = Dimensions.get('screen');
    const [bannerVisible, setBannerVisible] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [subscriptionData, taskAssignments] = await Promise.all([
                getSubscriptionByUser(user?.sub),
                getTaskAssigmentsByUser(user?.sub),
            ]);
            setSubscriptionData(subscriptionData);

            // Filtrar tareas aprobadas para revisión antes de establecer taskAssignments
            const filteredTaskAssignments = taskAssignments.filter(
                assignment => assignment.state !== 'REVIEW_APPROVED'
            );
            setTaskAssignments(filteredTaskAssignments);

            if (subscriptionData.plan) {
                const tasks = await getTasksByPlan(subscriptionData.plan.plan_id);

                // Filtrar tareas aprobadas para revisión antes de establecer tasks
                const filteredTasks = tasks.filter(
                    task => !filteredTaskAssignments.some(assignment => assignment.task_id === task.task_id)
                );
                setTasks(filteredTasks);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user?.sub]);

    useEffect(() => {
        fetchData();
    }, [fetchData, reload]);

    useEffect(() => {
        setBannerVisible(taskAssignments.length > 0 ? true : false);
    }, [taskAssignments]);

    const handleEnrollTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            const newAssignment = {
                taskId: taskId,
                userId: user.sub,
                dueDate: new Date(),
                attachment: '',
                state: 'INPROGRESS',
            };

            await createTaskAssignment(newAssignment);
        } catch (error) {
            console.error('Error creating task assignment:', error);
            setError(error);
        } finally {
            setReload((prev) => !prev);
            setLoading(false);
        }
    };

    const isTaskAssigned = (taskId) => taskAssignments?.some((assignment) => assignment.task.task_id === taskId);

    return (
        <VStack
            h="100%"
            bg="primaryBg"
            alignItems="center"
            justifyContent="center"
            py={5}
            px={5}
            rounded="lg"
        >
            {loading && <LoadingOverlay />}
            <>
                <Flex
                    background="transparent"
                    alignItems="center"
                    shadow={true}
                    flexDirection="row"
                    w="100%"
                    pt={6}
                >
                    <Box flex={0.2}>
                        <Icon
                            color="gray.300"
                            mr={5}
                            onPress={() => navigation.navigate('Tareas')}
                            as={MaterialIcons}
                            name="arrow-back-ios"
                            size={6}
                        />
                    </Box>
                    <Text
                        fontSize="xl"
                        fontWeight={500}
                        textAlign="center"
                        color="gray.300"
                    >
                        Tareas disponibles
                    </Text>
                </Flex>



                <VStack
                    bg="#181f27"
                    shadow={50}
                    border="1px solid green"
                    justifyContent="space-between"
                    mt={4}
                    mx={1}
                    p={4}
                    borderRadius={5}
                    alignItems="center"
                >
                    <Text fontWeight={400} color="gray.300">
                        <Text fontWeight={600}>Inscríbete</Text> en las tareas disponibles
                        de tu suscripción y complétala en tus asignaciones.
                    </Text>
                </VStack>

                {bannerVisible && (
                    <Box bg="#BB6BD9" p={2} my={4} borderRadius={5}>
                        <Text color="gray.300">
                            Ya tienes algrunas tareas asignadas y no estarán disponibles
                            hasta que las completes en tu sección de tareas.
                        </Text>
                    </Box>
                )}

                <ScrollView width='95%' mx={0}>
                    {tasks.map((item, index) => (
                        <TaskCard
                            key={`task-${index}`}
                            item={item}
                            index={index}
                            handleAction={handleEnrollTask}
                            isAssigned={isTaskAssigned(item.task_id)}
                            subscriptionData={subscriptionData}
                        />
                    ))}


                </ScrollView>
            </>
        </VStack>
    );
};

export default TasksPlan;
