import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, Modal, VStack, Text, View, useToast, AlertDialog, Image, IconButton, Icon, Alert } from 'native-base';
import { AuthContext } from '../../../AuthContext';
import Carousel from 'react-native-reanimated-carousel';
import { useForm, Controller } from 'react-hook-form';
import NoMoney from '../../../assets/img/noMoney.png';
import coinImage from '../../../assets/img/coin.png';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { getPlans } from '../../../api/plan'
import useAuthStore from '../../../store/useAuthStore';
import { updateSubscription } from '../../../api/subscriptions';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';


export default function NotificationPlan({ navigation }) {
    const { width, height } = Dimensions.get('screen');
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const { idSubscription } = useAuthStore();

    const fetchPlans = async () => {
        setLoading(true);
        setError(null); // Resetea el estado de error antes de la llamada
        try {
            const data = await getPlans();
            setPlans(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const onSubmit = async (idPlan) => {
        setLoading(true);
        try {
            await updateSubscription(idSubscription, idPlan);
            setLoading(false);
            navigation.navigate('Home');
        } catch (err) {
            setLoading(false);

        }
    };


    const handleRecargar = () => {
        setShowAlert(false);
        navigation.navigate('Reload');

    };

    const handleConfirmar = () => {
        setShowAlert(false);
      //  navigation.navigate('Login');
    };


    const handleOpenModal = () => setShowAlert(true);
    const handleCloseModal = () => setShowAlert(false);
    const cancelRef = useRef();

    return (
        <View p="6" bg="coolGray.900" flex={1} alignItems="center" justifyContent="center">
            {loading && <LoadingOverlay />}

            {/*   {error?.show && (
                <Alert status='error' w='100%'>
                    <Text>{error.message}</Text>
                </Alert>
            )} */}

            <Carousel
                loop={true}
                width={width}
                mode='parallax'
                height={height - 0.2}
                data={plans?.data}
                renderItem={({ item }) => (
                    <View bg="coolGray.800" borderRadius="2xl" mt="1/5" style={{ alignItems: 'center', justifyContent: 'space-between', flex: 0.8 }} >

                        <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 0.6 }}>


                            <View style={{ alignItems: 'center' }}>

                                <Image
                                    h={100}
                                    mx="auto"
                                    source={coinImage}
                                    alt="No Money"
                                    resizeMode="contain"
                                />
                                <Text color="yellow.400" fontSize="4xl" fontWeight="bold">
                                    {item.plan_name}
                                </Text>
                                <Text fontSize="3xl" bold color="yellow.300">
                                    ${item.price} COIN
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text color="gray.200" fontSize="lg" textAlign="center">
                                    {item.description}
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                    Max assignable tasks: {item.max_assignable_tasks}
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                    Credits per task: {item.credits_per_task}
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                    Referral reward: {item.referral_reward}
                                </Text>
                            </View>
                        </View>

                        <Button width={width - 40} borderRadius="full" bg="yellow.500" _hover={{ bg: "yellow.600" }} _pressed={{ bg: "yellow.700" }} mb={6} onPress={() => onSubmit(item?.plan_id)}>
                            Comprar
                        </Button>
                    </View>

                )}


            />

            <Modal isOpen={showAlert} onClose={handleOpenModal} size="full">
                <Modal.Content mt="auto" bg="#F0F0F0" h={isOpen ? 700 : 400}>
                    <IconButton
                        position="absolute"
                        right={2}
                        top={2}
                        icon={<Icon as={Ionicons} name="close" color="black" />}
                        onPress={handleOpenModal}
                    />
                    <VStack space={4} p={5}>
                        {!isOpen ?
                            <>
                                <Text color="black" textAlign='center' fontSize={22} fontWeight={500} >Adquiere un plan de beneficios</Text>
                                <Text color="black" textAlign='center' fontSize={22} fontWeight={200}>
  No tienes ningún plan asociado a tu cuenta. Aquí están los planes disponibles para ti.
</Text>


                                <Button onPress={() => setIsOpen(true)} w="100" fontSize={18} color='black' bg="gray.500" margin="auto" borderRadius="3xl" >ver</Button>
                            </> :
                            <>
                                <Image
                                    w="100%"
                                    h={200}
                                    mx="auto"
                                    source={NoMoney}
                                    alt="Alternate Text"
                                    size="2xl"
                                />
                                <Text fontSize={20} mx="auto" my={2} bold color="red.300">$0 COIN</Text>
                                <Text color="black" textAlign='center' fontSize={22} fontWeight={200} >Recuerda que en UWU manejamos nuestra propia moneda de cambio, por favor recarga tu cuenta a traves de nuestra wallet para adquirir nuestros planes. </Text>
                                <Button onPress={handleRecargar} w="100" fontSize={18} color='gray.100' bg="lightBlue.500" margin="auto" borderRadius="3xl" >Recargar</Button>
                            </>
                        }

                    </VStack>
                </Modal.Content>
            </Modal>

            <AlertDialog
/*                 isOpen={showAlert}
 */                onClose={handleCloseModal}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Body>
                        <VStack space={4} alignItems="center">
                            <Text fontSize="lg">¿Seguro de que quieres abandonar esta experiencia?</Text>
                            <Button onPress={handleConfirmar} w="full" fontSize="md" colorScheme="red" borderRadius="full">
                                Salir
                            </Button>
                        </VStack>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </View>
    );
}
