import { Avatar, VStack, Text, Icon, Flex, HStack, ScrollView, Divider, Button } from 'native-base';
import UserAvatar from '../../../assets/img/Avatar.jpg'
import { MaterialIcons } from '@expo/vector-icons'; import React from 'react'
import { useNavigation } from '@react-navigation/native';

function Reload() {
    const navigation = useNavigation();
    const data = [
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
        { value: '450000', date: '2020-03-02 10:49 AM' },
    ]

    return (
        <VStack h="100%" bg="white" alignItems="center" p={4} rounded="lg">
            <Flex flexDirection="row" w="100%" mt={2} justify="space-between" align='center'>
                <Text fontSize="xl" fontWeight={200} color="black">Recargas</Text>
                <Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} />
            </Flex>


            <Button width='95%' mt={5}>
                Recargar
            </Button>
            <ScrollView>
                <Flex px={4} justify='center' h="90%" >
                    <Text fontSize="lg" fontWeight={500} mx="auto" >
                        Historial
                    </Text>
                    <Divider mx="auto" width={50} my={2} />

                    {data.map(item =>
                        <HStack bg="primaryGray"
                            width={350}
                            justifyContent="space-between"
                            mx="auto"
                            my={2}
                            px={4}
                            py={5}
                            borderRadius={10} space={2} alignItems="center">
                            <Text color="secondaryGreen" fontSize="lg" >{item.value}</Text>
                            <Text color="gray.200" fontSize="md" >{item.date}</Text>
                        </HStack>
                    )}
                </Flex>
            </ScrollView>
        </VStack>
    );
}

export default Reload;