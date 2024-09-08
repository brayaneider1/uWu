import { VStack, Text, Icon, Flex, HStack, Divider, ScrollView, Button, Box, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function Help() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null); // Estado para manejar el desplegable

  const questions = [
    { value: '¿Qué es UwU y cómo funciona?', answer: 'UwU es una plataforma que te permite ganar dinero viendo anuncios publicitarios.' },
    { value: '¿Cómo gano dinero viendo anuncios?', answer: 'Solo tienes que ver los anuncios disponibles y seguir las instrucciones para ganar recompensas.' },
    { value: '¿Qué métodos de pago están disponibles?', answer: 'UwU ofrece varios métodos de pago como PayPal y transferencias bancarias.' },
    { value: '¿Es seguro usar UwU?', answer: 'Sí, UwU utiliza medidas de seguridad para proteger tu información.' },
    { value: '¿Puedo invitar amigos a UwU?', answer: 'Sí, puedes invitar amigos usando tu código de referencia.' },
    { value: '¿Cuánto tiempo se tarda en recibir pagos?', answer: 'Los pagos suelen procesarse dentro de 1-3 días hábiles.' }
  ];

  const questions2 = [
    { value: 'Términos y condiciones', answer: 'Revisa los términos y condiciones para más detalles sobre el uso de UwU.' },
    { value: 'Política de privacidad', answer: 'Tu privacidad es importante para nosotros. Consulta nuestra política de privacidad.' },
    { value: 'Soporte técnico', answer: 'Si tienes problemas técnicos, contáctanos para recibir asistencia.' },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <VStack h="100%" bg="#1A202C" p={4} rounded="lg" space={5} alignItems="center">
      {/* Header */}
      <Flex width="100%" flexDirection="row" justify="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white">Ayuda</Text>
        <Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} color="white" />
      </Flex>

      {/* Body */}
      <ScrollView w="100%" showsVerticalScrollIndicator={false}>
        <VStack space={8}>
          {/* FAQ Section */}
          <VStack space={3}>
            <Text fontSize="lg" fontWeight="bold" color="white">Preguntas frecuentes</Text>
            <Divider bg="blue.500" />
            {questions.map((item, index) => (
              <Box key={index}>
                <Pressable onPress={() => toggleExpand(index)}>
                  <HStack 
                    bg={{
                      linearGradient: {
                        colors: ['#2A4365', '#1A202C'],
                        start: [0, 0],
                        end: [1, 1],
                      }
                    }} 
                    px={4} py={4} borderRadius={15} shadow={1.5} alignItems="center" justifyContent="space-between">
                    <Text color="gray.300" fontSize="md">{item.value}</Text>
                    <Icon as={MaterialIcons} name={expanded === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={6} color="gray.300" />
                  </HStack>
                </Pressable>
                {expanded === index && (
                  <Text color="gray.400" p={4}>{item.answer}</Text>
                )}
              </Box>
            ))}
          </VStack>

          {/* Links Section */}
          <VStack space={3}>
            <Text fontSize="lg" fontWeight="bold" color="white">Enlaces de interés</Text>
            <Divider bg="blue.500" />
            {questions2.map((item, index) => (
              <Box key={index}>
                <Pressable onPress={() => toggleExpand(index)}>
                  <HStack 
                    bg={{
                      linearGradient: {
                        colors: ['#2D3748', '#1A202C'],
                        start: [0, 0],
                        end: [1, 1],
                      }
                    }} 
                    px={4} py={4} borderRadius={15} shadow={1.5} alignItems="center" justifyContent="space-between">
                    <Text color="gray.300" fontSize="md">{item.value}</Text>
                    <Icon as={MaterialIcons} name={expanded === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={6} color="gray.300" />
                  </HStack>
                </Pressable>
                {expanded === index && (
                  <Text color="gray.400" p={4}>{item.answer}</Text>
                )}
              </Box>
            ))}
          </VStack>

          {/* Contact Button */}
          <Button bg="blue.500" borderRadius="full" _text={{ fontWeight: 'bold', color: 'white' }} shadow={3}>
            Contactar Soporte
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default Help;
