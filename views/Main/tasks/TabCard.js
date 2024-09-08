import React, { useState } from 'react';
import { Box, Text, ScrollView, Flex, Button, Icon, Modal, FormControl, Image } from 'native-base';
import { Linking, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const TabCard = ({ tasks, handleSubmit }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [image, setImage] = useState(null);

    const handleView = (url) => {
        Linking.openURL(url);
    };

    const handleFinish = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result?.assets[0].uri);
        }
    };

    const onSubmit = (task) => {
        setShowModal(false);
        setImage(null);
        handleSubmit(task);
    };

    return (
        <>
            <ScrollView mb={20}>
                {tasks.map((task, i) => (
                    <Box key={i} mx={4} my={3} rounded="lg"  shadow={0}>
                        <Flex  style={styles.gradientBackground} direction="column" justifyContent="space-between">
                            <Flex direction='row' mb={5} justify='space-between' pr={2} align='center'>
                                <Flex direction='row' align='center'>
                                    <Icon as={MaterialIcons} name="description" size={5} color="secondaryGreen" mr={2} />
                                    <Text color='green.400' fontWeight={700}>{task.task.description} {i + 1}</Text>
                                </Flex>
                                <Flex direction='row' align='center'>
                                    <Icon as={MaterialIcons} name="attach-money" size={5} color="green.500" mr={1} />
                                    <Text color="green.500" fontWeight={600}>{task?.task.plan?.credits_per_task}</Text>
                                </Flex>
                            </Flex>
                            <Flex direction='row' align='center'>
                                {
                                    {
                                        'ACCEPTED': (
                                            <Button
                                                flex={1}
                                                size="md"
                                                bg="#38A169"
                                                color="white"
                                                borderRadius="full"
                                                px={5}
                                                onPress={() => handleFinish(task)}
                                                _text={{ color: "white", fontWeight: "600" }}
                                                leftIcon={<Icon as={MaterialIcons} name="check-circle" size={5} color="white" />}
                                            >
                                                Terminar
                                            </Button>
                                        ),
                                        'COMPLETED': (
                                            <Button disabled flex={1} size="md" bg="yellow.100" color="gray.300" borderRadius="full" px={5}
                                                _text={{ color: "gray.500" }}
                                                leftIcon={<Icon as={MaterialIcons} name="hourglass-empty" size={5} color="gray.500" />}
                                            >
                                                Pendiente de aprobación
                                            </Button>
                                        ),
                                        'REVIEW_APPROVED': (
                                            <Box display='flex' flex={1} flexDirection="row" alignItems="center">
                                                <Icon as={MaterialIcons} name="verified" size={5} color="amber.500" mr={2} />
                                                <Text color="amber.500" fontWeight="700">
                                                    Envío Aprobado
                                                </Text>
                                            </Box>
                                        )
                                    }[task.state]
                                }
                                <Button ml={6} size="xs" justifyContent='center' bg="#BB6BD9" color="white" borderRadius="full" px={4}
                                    leftIcon={<Icon as={MaterialIcons} name="play-circle-outline" size={4} color="white" />}
                                    _text={{ fontSize: 11, color: 'white' }}
                                    onPress={() => handleView(task.task.asset)}
                                >
                                    Ver
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </ScrollView>


            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setImage(null); }}>
                <Modal.Content bg='#293751' maxWidth="400px" borderRadius="xl" shadow="9">
                    <Modal.CloseButton />
                    <Modal.Header bg='#293751' borderBottomWidth={1} borderColor="#BB6BD9">
                        {selectedTask && (
                            <Flex direction='row' justify='space-between' align='center'>
                                <Flex direction='row' align='center'>
                                    <Icon as={MaterialIcons} name="description" size={6} color="#BB6BD9" mr={2} />
                                    <Text fontWeight={700} fontSize={18} color='white'>{selectedTask.task.description}</Text>
                                </Flex>
                                <Box>
                                    <Flex direction='row' align='center' mr={10} >
                                        <Icon as={MaterialIcons} name="attach-money" size={6} color='green.500' />
                                        <Text color='green.500' fontSize={16} fontWeight={700}>{selectedTask.task.plan.credits_per_task}</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            {image && (
                                <Box my={4} rounded="lg" overflow="hidden">
                                    <Image source={{ uri: image }} alt="Selected image" style={styles.modalImage} />
                                </Box>
                            )}
                            {!image ? (
                                <Button mt={4} bg="#BB6BD9" borderRadius="full" shadow="2" onPress={pickImage}>
                                    <Flex flexDirection='row' align='center'>
                                        <Icon as={MaterialIcons} name="photo-library" size={6} color="white" mr={2} />
                                        <Text color='white' fontWeight={600}>Seleccionar Imagen</Text>
                                    </Flex>
                                </Button>
                            ) : (
                                <Button mt={4} bg="green.500" borderRadius="full" shadow="2" onPress={() => onSubmit(selectedTask)}>
                                    <Flex flexDirection='row' align='center'>
                                        <Icon as={MaterialIcons} name="send" size={6} color="white" mr={2} />
                                        <Text color='white' fontWeight={600}>Enviar</Text>
                                    </Flex>
                                </Button>
                            )}
                        </FormControl>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        backgroundColor:'transparent',
        backgroundImage: 'linear-gradient(45deg, #BB6BD9, #1F2937)',
        borderRadius: 12,
        padding: 15,
    },
    modalImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
});


export default TabCard;
