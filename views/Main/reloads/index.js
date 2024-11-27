import React, { useState } from 'react';
import { VStack, Text, Icon, Flex, HStack, ScrollView, Divider, Button, Modal, Box, FormControl, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updatePaymentProof } from '../../../api/subscriptions'; // Asegúrate de importar la función correctamente
import useAuthStore from '../../../store/useAuthStore'; // Importar el hook de autenticación

function Reload() {
    const navigation = useNavigation();
    const { user } = useAuthStore(); // Obtener el usuario autenticado
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const data = [
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
    ];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!image || !user) return;

        setLoading(true);
        try {
            const base64Image = await convertImageToBase64(image);
            await updatePaymentProof(user.sub, base64Image);
            setShowModal(false);
            setImage(null);
        } catch (error) {
            console.error('Error uploading payment proof:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertImageToBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <VStack h="100%" bg="#1A202C" p={4} rounded="lg" space={4} alignItems="center">
            {/* Header */}
            <Flex flexDirection="row" w="100%" justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="white">Recargas</Text>
                <Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} color="white" />
            </Flex>

            {/* Botón para recargar */}
            <Button width='95%' mt={5} bg="blue.500" borderRadius="full" onPress={() => setShowModal(true)} shadow={2}>
                Recargar
            </Button>

            {/* Historial de recargas */}
            <ScrollView width="100%" showsVerticalScrollIndicator={false} mt={4}>
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>Historial</Text>
                <Divider bg="blue.500" mb={4} />

                {data.map((item, index) => (
                    <HStack
                        key={index}
                        bg={{
                            linearGradient: {
                                colors: ['#2A4365', '#1A202C'],
                                start: [0, 0],
                                end: [1, 1],
                            }
                        }}
                        px={4}
                        py={4}
                        borderRadius={15}
                        shadow={1.5}
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
                        <Text color="secondaryGreen" fontSize="lg">{item.value}</Text>
                        <Text color="gray.300" fontSize="md">{item.date}</Text>
                    </HStack>
                ))}
            </ScrollView>

            {/* Modal para subir el comprobante */}
            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setImage(null); }}>
                <Modal.Content bg='#1A202C' maxWidth="400px" borderRadius="lg" shadow={5}>
                    <Modal.CloseButton />
                    <Modal.Header bg='#1A202C' borderBottomWidth={1} borderColor="blue.500">
                        <Flex direction="row" alignItems="center">
                            <Icon as={MaterialIcons} name="account-balance-wallet" size={6} color="blue.500" mr={2} />
                            <Text color="white" fontWeight={700} fontSize={16}>Recargar a cuenta de Binance</Text>
                        </Flex>
                    </Modal.Header>

                    <Modal.Body>
                        <Text color="gray.300" mb={4}>
                            Por favor, realiza el depósito a la cuenta de Binance y sube el comprobante de la transacción.
                        </Text>

                        <FormControl>
                            {image && (
                                <Box mb={4} rounded="lg" overflow="hidden">
                                    <Image source={{ uri: image }} alt="Comprobante de depósito" style={{ width: '100%', height: 200, borderRadius: 10 }} />
                                </Box>
                            )}

                            {!image ? (
                                <Button mt={2} bg="blue.500" borderRadius="full" shadow={2} onPress={pickImage}>
                                    <Flex flexDirection="row" align="center">
                                        <Icon as={MaterialIcons} name="photo-library" size={6} color="white" mr={2} />
                                        <Text color="white" fontWeight={600}>Subir comprobante</Text>
                                    </Flex>
                                </Button>
                            ) : (
                                <Button mt={2} bg="green.500" borderRadius="full" shadow={2} onPress={handleSubmit} isLoading={loading}>
                                    <Flex flexDirection="row" align="center">
                                        <Icon as={MaterialIcons} name="send" size={6} color="white" mr={2} />
                                        <Text color="white" fontWeight={600}>Enviar comprobante</Text>
                                    </Flex>
                                </Button>
                            )}
                        </FormControl>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </VStack>
    );
}

export default Reload;