import React, { useEffect, useState } from 'react'
import { VStack, Text, Icon, Flex, ScrollView, Box, Button, Avatar, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import useAuthStore from '../../../store/useAuthStore';
import { getSubscriptionByUser, getSubscriptorsByCode } from '../../../api/subscriptions';
import { getTasksByPlan } from '../../../api/plan';
import { Dimensions, ImageBackground } from 'react-native';
import { PressableScale } from '../../../components/PressableScale/PressableScale';

function Community() {
    const navigation = useNavigation();
    const { user, code } = useAuthStore();
    const [subscriptorsData, setSubscriptorsData] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchSubscriptors = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSubscriptorsByCode(code == 'fKRiyFkr' ? 'XYZ123' : code);
            setSubscriptorsData(data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptors()
    }, []);


    return (
        <VStack h="100%" bg="primaryBg" alignItems="center" justifyContent='center' py={5} px={5} rounded="lg">
            {loading && <LoadingOverlay />}
            <>
                <Flex background='transparent' alignItems='center' shadow={true} flexDirection="row" w="100%" pt={6}  >
                    <Icon color='gray.300' mr={5} onPress={() => navigation.navigate("Tareas")} as={MaterialIcons} name="arrow-back-ios" size={6} />
                    <Text fontSize="lg" fontWeight={500} textAlign='center' color="gray.300">Comunidad</Text>
                </Flex>

                <VStack bg="#181f27"
                    shadow={50}
                    border='1px solid green'
                    justifyContent="space-between"
                    mt={4}
                    mx={1}
                    p={4}
                    borderRadius={5}
                    alignItems="center">
                    <Text fontWeight={400} color="gray.300">Aquí en la <Text fontWeight={600}>comunidad</Text> puedes ver a todos los suscritos a tu plan de referidos.</Text>
                </VStack>
                <ScrollView mx={0}>
                    <Flex direction="row" flexWrap="wrap" justifyContent="space-between">
                        {subscriptorsData.map((item, index) => (
                            <Box
                                justifyContent='center'
                                alignItems='center'
                                key={index}
                                mt={4}
                                borderRadius="full"
                                width="45%" // Usar 48% para dos columnas con espacio entre ellas.
                            >
                                <Avatar size='xl' bg="gray.500" p={1} shadow={10} source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                }}>
                                </Avatar>
                                <Text mt={2} fontWeight={500} color="gray.300" fontSize="md">
                                    {item.name}
                                </Text>
                                <Text fontWeight={500} color="gray.300" fontSize="xs">
                                    {item.email}
                                </Text>
                                <Text fontWeight={500} color="purple.300" fontSize="xs">
                                    {item?.plan?.plan_name}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                </ScrollView>
            </>
        </VStack>
    );
}

export default Community;