import React, { useEffect, useState } from 'react';
import { VStack, Text, Icon, Flex, ScrollView, Box, Button, Avatar } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import useAuthStore from '../../../store/useAuthStore';
import { getSubscriptorsByCode } from '../../../api/subscriptions';

function Community() {
  const navigation = useNavigation();
  const { user, code } = useAuthStore();
  const [subscriptorsData, setSubscriptorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSubscriptors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSubscriptorsByCode(code == 'fKRiyFkr' ? 'XYZ123' : code);
      setSubscriptorsData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptors();
  }, []);

  return (
    <VStack h="100%" bg="#1A202C" alignItems="center" justifyContent='center' py={5} px={5} rounded="lg">
      {loading && <LoadingOverlay />}
      <>
        {/* TopBar */}
        <Flex
          bg={{
            linearGradient: {
              colors: ['#293751', '#1A202C'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          alignItems='center' flexDirection="row" w="100%" py={4} px={4} mb={5} borderRadius="lg" 
        >
          <Icon color='gray.300' onPress={() => navigation.goBack()} as={MaterialIcons} name="arrow-back-ios" size={6} />
          <Text flex={1} fontSize="lg" fontWeight={700} textAlign='center' color="gray.100">
            Comunidad
          </Text>
          <Button variant="ghost" onPress={() => navigation.navigate("Perfil")} _pressed={{ bg: 'rgba(255,255,255,0.1)' }}>
            <Icon as={MaterialIcons} name="people-outline" size={6} color="white" />
          </Button>
        </Flex>

        {/* Caja de descripción */}
        <VStack bg="#2D3748" p={4} borderRadius={10} alignItems="center" mb={5} shadow="4" _light={{ bg: '#2A4365' }}>
          <Text fontWeight={400} color="gray.300" textAlign="center">
            ¡Bienvenido a la <Text fontWeight={700} color="purple.400">comunidad!</Text> Aquí puedes ver todos los suscriptores conectados a tu plan.
          </Text>
        </VStack>

        {/* Subscritores */}
        <ScrollView w="100%">
          <Flex direction="row" flexWrap="wrap" justifyContent="space-between">
            {subscriptorsData.map((item, index) => (
              <Box
                key={index}
                bg="#1A202C"
                borderRadius="lg"
                p={4}
                m={2}
                width="48%"
                justifyContent="center"
                alignItems="center"
                shadow={6} // Ajuste de sombra más sutil y profesional
                _light={{
                  shadow: 7,
                  _text: { color: "gray.300" },
                }}
                _dark={{
                  shadow: 4,
                }}
              >
                <Avatar size='xl' bg="gray.500" p={1} shadow={5} source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                </Avatar>
                <Text mt={2} fontWeight={600} color="gray.100" fontSize="md">
                  {item.name}
                </Text>
                <Text fontWeight={400} color="gray.400" fontSize="sm">
                  {item.email}
                </Text>
                <Text fontWeight={600} color="purple.300" fontSize="sm">
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
