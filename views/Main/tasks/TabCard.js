import React, { useState } from 'react';
import { Box, Text, ScrollView, Flex, Button, Icon, Modal, FormControl, Image } from 'native-base';
import { Linking, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Añadimos más bibliotecas de iconos
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
        handleSubmit(task)
    }

    return (
        <>
            <ScrollView mb={20}>
                {tasks.map((task, i) => (
                    <Box key={i} mx={4} my={2} rounded="lg">
                        <Box bg='#293751' opacity={0.8} flex={1} p={4} rounded="lg">
                            <Flex direction="column" justifyContent="space-between">
                                <Flex direction='row' mb={5} justify='space-between' pr={2} align='center'>
                                    <Flex direction='row' align='center'>
                                        <Icon as={MaterialIcons} name="description" size={5} color="secondaryGreen" mr={2} />
                                        <Text color='green.400' fontWeight={600}>{task.task.description} {i + 1}</Text>
                                    </Flex>
                                    <Flex direction='row' align='center'>
                                        <Icon as={MaterialIcons} name="attach-money" size={5} color="green.500" mr={1} />
                                        <Text color="green.500">{task?.task.plan?.credits_per_task}</Text>
                                    </Flex>
                                </Flex>
                                <Flex direction='row' align='center'>
                                    {
                                        {
                                            'ACCEPTED': (
                                                <Button
                                                    flex={1}
                                                    size="md"
                                                    bg="secondaryGreen"
                                                    color="white"
                                                    borderRadius="3xl"
                                                    px={5}
                                                    onPress={() => handleFinish(task)}
                                                >
                                                    <Flex
                                                        flexDirection="row"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Icon
                                                            as={MaterialIcons}
                                                            name="check-circle"
                                                            size={5}
                                                            color="white"
                                                            mr={2}
                                                        />
                                                        <Text
                                                            color="white"
                                                            fontWeight="500"
                                                        >
                                                            Terminar
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            ),
                                            'COMPLETED': (
                                                <Button disabled flex={1} flexDirection="row" size="md" bg="yellow.100" color="gray.300" borderRadius="3xl" px={5}>


                                                    <Flex flexDirection='row'>

                                                        <Icon as={MaterialIcons} name="hourglass-empty" size={5} color="gray.500" mr={2} />
                                                        <Text color="gray.500">
                                                            Pendiente de aprobación
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            ),
                                            'REVIEW_APPROVED': (
                                                <Box display='flex' flex={1} flexDirection="row">
                                                    <Icon as={MaterialIcons} name="verified" size={5} color="amber.500" mr={2} />
                                                    <Text color="amber.500" fontWeight="500">
                                                        Envio Aprobado
                                                    </Text>
                                                </Box>
                                            )
                                        }[task.state]
                                    }
                                    <Button ml={6} size="xs" justifyContent='center' bg="#BB6BD9" color="white" borderRadius="3xl" px={4} onPress={() => handleView(task.task.asset)}>
                                        <Icon as={MaterialIcons} name="play-circle-outline" size={4} color="white" />
                                        <Text fontSize={11} color='white'>
                                            Ver
                                        </Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </ScrollView>

            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setImage(null); }}>
                <Modal.Content bg='#293751' maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header bg='#293751'>
                        {selectedTask && (
                            <Flex direction='row' justify='space-between' align='center'>
                                <Flex direction='row' align='center'>
                                    <Icon as={MaterialIcons} name="description" size={5} color="#BB6BD9" mr={2} />
                                    <Text fontWeight={500} color='white'>{selectedTask.task.description}</Text>
                                </Flex>
                                <Box mr={10} >
                                    <Flex direction='row' align='center'>
                                        <Icon as={MaterialIcons} name="attach-money" size={5} color='green.600' mr={1} />
                                        <Text color='green.600' fontSize={12}>{selectedTask.task.plan.credits_per_task}</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            {image && (
                                <Box>
                                    <Image source={{ uri: image }} style={{ width: '100%', height: 250, margin: 'auto', borderRadius: 5 }} />
                                </Box>
                            )}
                            {image === null ?
                                <Button mt={2} onPress={pickImage}>
                                    <Flex flexDirection='row' >

                                        <Icon as={MaterialIcons} name="photo-library" size={5} color="white" mr={2} />
                                        <Text color='white'>
                                            Seleccionar Imagen
                                        </Text>
                                    </Flex>
                                </Button>
                                :
                                <Button mt={2} onPress={() => handleSubmit(selectedTask?.assignment_id)}>
                                    <Flex flexDirection='row'>

                                        <Icon as={MaterialIcons} name="send" size={5} color="white" mr={2} />
                                        <Text color='white'>

                                            Enviar
                                        </Text>
                                    </Flex>
                                </Button>
                            }
                        </FormControl>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius: 15,
    },
    modalImage: {
        width: '100%',
        height: 250,
        marginBottom: 10,
        borderRadius: 10,
    }
});

export default TabCard;
