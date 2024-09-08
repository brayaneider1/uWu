import React, { useState, useEffect } from 'react';
import { VStack, Text, Icon, Flex, HStack, ScrollView, Divider, Button, Modal, Box, Input, FormControl } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotalEarnings } from '../../../services/utils/getTotalEarnings';

function Whitdrawals() {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [binanceAccount, setBinanceAccount] = useState(null); // Simulación del token de cuenta de Binance
    const [editingAccount, setEditingAccount] = useState(false); // Estado para editar la cuenta
    const [inputValue, setInputValue] = useState(''); // Valor del input para la cuenta de Binance
    const [withdrawAmount, setWithdrawAmount] = useState(''); // Monto de retiro
    const [totalEarnings, setTotalEarnings] = useState('0'); // State to store total earnings
    const [totalAvailable, setTotalAvailable] = useState(totalEarnings); // Simulación de saldo disponible del usuario
    const [isWithdrawEnabled, setIsWithdrawEnabled] = useState(false); // Estado para habilitar/deshabilitar botón
    const [withdrawRequests, setWithdrawRequests] = useState([]); // Lista de solicitudes de retiro

    useEffect(() => {
        // Validar en tiempo real si el monto de retiro es válido
        const amount = parseInt(withdrawAmount);
        if (!isNaN(amount) && amount > 0 && amount <= totalAvailable) {
            setIsWithdrawEnabled(true);
        } else {
            setIsWithdrawEnabled(false);
        }
    }, [withdrawAmount]);

    const saveBinanceAccount = () => {
        setBinanceAccount(inputValue); // Simular guardado de la cuenta de Binance
        setEditingAccount(false);
        setInputValue('');
    };

    const toggleEditAccount = () => {
        setEditingAccount(!editingAccount);
    };

    const handleWithdrawRequest = () => {
        const newRequest = {
            value: withdrawAmount,
            date: new Date().toLocaleString(),
            status: 'En Proceso'
        };
        setWithdrawRequests([...withdrawRequests, newRequest]);
        setShowModal(false);
        setWithdrawAmount(''); // Limpiar el monto después de la solicitud
    };


	
	useEffect(() => {
		const fetchEarnings = async () => {
			const earnings = await getTotalEarnings();

			setTotalEarnings(earnings); 
		};
		
		fetchEarnings();

        setTotalAvailable(+totalEarnings)
	}, [totalEarnings]);

    return (
        <VStack h="100%" bg="#1A202C" p={4} rounded="lg" space={4} alignItems="center">
            {/* Header */}
            <Flex flexDirection="row" w="100%" justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="white">Retiros</Text>
                <Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} color="white" />
            </Flex>

            {/* Botón para retirar */}
            <Button width='95%' mt={5} bg="red.500" borderRadius="full" onPress={() => setShowModal(true)} _text={{ fontSize: 'md', fontWeight: 'bold' }} shadow={2}>
                Retirar
            </Button>

            {/* Historial de retiros */}
            <ScrollView width="100%" showsVerticalScrollIndicator={false} mt={4}>
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>Historial</Text>
                <Divider bg="red.500" mb={4} />

                {withdrawRequests.map((item, index) => (
                    <HStack
                        key={index}
                        bg={item.status === 'Completado' ? '#2C7A7B' : '#805AD5'}
                        px={4}
                        py={4}
                        borderRadius={15}
                        shadow={2}
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
                        <Flex>
                            <Text color="white" fontSize="lg">{item.value}</Text>
                            <Text color="gray.300" fontSize="sm">{item.status}</Text>
                        </Flex>
                        <Text color="gray.300" fontSize="md">{item.date}</Text>
                    </HStack>
                ))}
            </ScrollView>

            {/* Modal para crear la solicitud de retiro */}
            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingAccount(false); }}>
                <Modal.Content bg='#1A202C' maxWidth="380px" borderRadius="lg" shadow={3}>
                    <Modal.CloseButton />
                    <Modal.Header bg='#1A202C' borderBottomWidth={1} borderColor="purple.500">
                        <Flex direction="row" alignItems="center">
                            <Icon as={MaterialIcons} name="account-balance-wallet" size={5} color="purple.500" mr={2} />
                            <Text color="white" fontWeight={600} fontSize={16}>Retirar a cuenta de Binance</Text>
                        </Flex>
                    </Modal.Header>

                    <Modal.Body>
                        <Text color="gray.400" mb={3}>
                            Registra o actualiza tu cuenta de Binance para hacer el retiro.
                        </Text>

                        <FormControl mb={4}>
                            {binanceAccount && !editingAccount ? (
                                <Flex direction="row" justifyContent="space-between" alignItems="center">
                                    <Text color="gray.300">Cuenta de Binance: {binanceAccount}</Text>
                                    <Icon as={MaterialIcons} name="edit" size={5} color="blue.400" onPress={toggleEditAccount} />
                                </Flex>
                            ) : (
                                <Box>
                                    <Input
                                        placeholder="Ingresa tu cuenta de Binance"
                                        value={inputValue}
                                        onChangeText={setInputValue}
                                        mb={4}
                                        bg="gray.800"
                                        color="white"
                                        borderRadius={8}
                                        height={10}
                                        _focus={{ borderColor: "blue.400", borderWidth: 1 }}
                                    />
                                    <Button
                                        bg="blue.400"
                                        borderRadius={8}
                                        height={10}
                                        _text={{ fontWeight: "bold" }}
                                        onPress={saveBinanceAccount}>
                                        Guardar cuenta
                                    </Button>
                                </Box>
                            )}
                        </FormControl>

                        <FormControl mb={4}>
                            <Input
                                placeholder="Monto a retirar"
                                keyboardType="numeric"
                                value={withdrawAmount}
                                onChangeText={setWithdrawAmount}
                                bg="gray.800"
                                color="white"
                                borderRadius={8}
                                height={10}
                                _focus={{ borderColor: "purple.500", borderWidth: 1 }}
                            />
                            <Text color="gray.400" fontSize="sm" mt={2}>
                                Saldo disponible: ${totalAvailable} COIN
                            </Text>
                        </FormControl>

                        <Button
                            bg={isWithdrawEnabled ? "green.400" : "gray.600"}
                            borderRadius={8}
                            height={10}
                            _text={{ fontWeight: "bold" }}
                            isDisabled={!isWithdrawEnabled}
                            onPress={handleWithdrawRequest}>
                            Enviar solicitud de retiro
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

        </VStack>
    );
}

export default Whitdrawals;
