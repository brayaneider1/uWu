import { Avatar, VStack, Text, Icon, Flex, HStack } from 'native-base';
import UserAvatar from '../../../assets/img/Avatar.jpg'
import { MaterialIcons } from '@expo/vector-icons'; import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import useAuthStore from '../../../store/useAuthStore';
import { getSubscriptionByUser } from '../../../api/subscriptions';

function ProfileSummary() {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const [subscriptionData, setSubscriptionData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchSubscription = async () => {
        setLoading(true);
        setError(null); // Resetea el estado de error antes de la llamada
        try {
            const data = await getSubscriptionByUser(user?.sub);
            setSubscriptionData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchSubscription();
    }, []);
    const data = [{ value: subscriptionData?.user?.name }, { value: subscriptionData?.user?.phone_number }, { value: subscriptionData?.user?.email }, { value: subscriptionData?.user?.referral_code }]
    return (
        <VStack h="100%" bg="white" alignItems="center" p={4} rounded="lg">

            {loading && <LoadingOverlay />}

            <Flex flexDirection="row" w="100%" mt={2} justify="space-between" align='center'>
                <Text fontSize="xl" fontWeight={200} color="black">Recargas</Text>
                <Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} />
            </Flex>
            <Flex px={4} justify='center' align='center' h="90%" >
                <Avatar
                    borderRadius="full"
                    size="2xl"
                    source={UserAvatar}
                />
                <Text color='black' fontSize="xl" fontWeight={200} mx="auto" mt={4}>
                    {subscriptionData?.user?.name}
                </Text>
                {data.map(item =>
                    <HStack bg="primaryGray"
                        width={350}
                        justifyContent="space-between"
                        mx="auto"
                        my={2}
                        px={4}
                        py={3}
                        borderRadius={10} space={2} alignItems="center">
                        <Text color="gray.400" fontSize="md" >{item.value}</Text>
                    </HStack>
                )}
                <VStack bg="purple.200"
                    shadow={3}
                    width={350}
                    justifyContent="space-between"
                    mx="auto"
                    my={2}
                    px={4}
                    py={5}
                    borderRadius={10} space={2} alignItems="center">

                    <Text color="gray.600" w="full" fontSize="md" fontWeight={500} textAlign="center" >Sucripción</Text>
                    <Text color="gray.500" w="full" fontSize="md"  ><Text fontWeight={500} color="secondaryGreen">Monto de pago:</Text>  {subscriptionData?.payment_amount} </Text>
                    <Text color="gray.500" w="full" fontSize="md"><Text fontWeight={500} color="secondaryGreen">Plan: </Text>  {subscriptionData?.plan?.plan_name} </Text>
                    <Text color="gray.500" w="full" fontSize="md"  ><Text fontWeight={500} color="secondaryGreen">Creditos por tareas: </Text> {subscriptionData?.plan?.credits_per_task} </Text>
                    <Text color="gray.500" w="full" fontSize="md"  ><Text fontWeight={500} color="secondaryGreen">Ganacia por referido:</Text>  {subscriptionData?.plan?.referral_reward} </Text>

                </VStack>
            </Flex>
        </VStack>
    );
}

export default ProfileSummary;