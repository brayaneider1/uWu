import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Text,
  Icon,
  VStack,
  HStack,
  Flex,
  ScrollView,
  View,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Share } from 'react-native';
import useAuthStore from '../../../store/useAuthStore';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import LottieView from 'lottie-react-native';

const TasksItem = [
  { title: 'Disponibles', quantity: 5 },
  { title: 'Inscritas', quantity: 0 },
];

const TasksItems = ({ title, quantity }) => (
  <VStack justifyContent='center' alignItems='center'>
    <Text color='gray.200' fontWeight={400} fontSize='md'>{title}</Text>
    <Text color='blue.400' bold fontSize='lg' my={3}>{quantity}</Text>
  </VStack>
);

const ReferralBox = ({ referralCode, shareReferralCode, navigation }) => (
  <HStack
    mt={2}
    bg='#293751'
    width='90%'
    justifyContent='space-between'
    mx='auto'
    px={4}
    py={5}
    borderRadius={10}
    shadow={2}
    space={2}
    alignItems='center'
  >
    <Text color='gray.200' fontSize='md'>
      Código de invitación: <Text color="secondaryGreen" fontWeight={500}>{referralCode}</Text>
    </Text>
    <Button onPress={shareReferralCode} bg="secondaryGreen" style={{ borderRadius: 5, padding: 5 }}>
      <Icon as={MaterialIcons} color='white' name='share' size={6} />
    </Button>
    <Button onPress={() => navigation.navigate("Community")} bg='purple.400' size='sm' borderRadius='3xl'>
      <Icon as={MaterialIcons} color='white' name='group' size={6} />
    </Button>
  </HStack>
);

const AnimatedWelcome = () => (
  <Box mt={6} bg='#293751' rounded='lg' mx={5} p={4} shadow={2}>
    <Flex flexDirection='row' justifyContent='center' align='center'>
      <LottieView
        style={styles.welcome}
        autoPlay
        loop
        source={require('../../../assets/lotties/community.json')}
      />
      <Box px={4} maxWidth='60%'>
        <Text fontSize='sm' fontWeight={200} color='gray.200' textAlign='left'>
          Conéctate, comparte, y crece en un entorno donde la publicidad impulsa amistades y oportunidades. ¡Descubre cómo juntos podemos lograr más!
        </Text>
      </Box>
    </Flex>
  </Box>
);

const TasksList = ({ navigation }) => (
  <Box bg='#293751' rounded='lg' mx={5} p={2} shadow={3}>
    <Flex direction='column' justifyContent='space-between'>
      <HStack
        width='80%'
        mx='auto'
        justifyContent='space-between'
        alignItems='center'
        space={2}
        p={4}
      >
        {TasksItem.map((item, index) => (
          <TasksItems key={index} title={item.title} quantity={item.quantity} />
        ))}
      </HStack>
      <Button
        leftIcon={<Icon as={MaterialIcons} color='blue.600' name='list' size={6} />}
        onPress={() => navigation.navigate('TasksPlan')}
        borderRadius="md"
        width='100%'
        size='md'
        height={10}
        bg='white'
        borderColor='blue.600'
        _text={{ color: 'blue.600', fontWeight: 'bold' }}
      >
        Ver Tareas
      </Button>
    </Flex>
  </Box>
);

const Home = ({ navigation }) => {
  const { user, subscriptionData, loading, error, fetchSubscription } = useAuthStore();
  console.log("🚀 ~ Home ~ subscriptionData:", subscriptionData)

  const shareReferralCode = async () => {
    const message = `¡Únete a nuestra comunidad! \nDescarga la aplicación de UwU en www.uwu.community y usa mi código de invitación para registrarte: ${subscriptionData?.user?.referral_code}`;
    try {
      await Share.share({ message, url: 'www.uwu.com' });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  

  useEffect(() => {
    if (user) {
      fetchSubscription(user.sub);
    }
  }, []);

  return (
    <ScrollView bg='primaryBg' pt={10} pb={5} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      {loading && <LoadingOverlay />}
      <Box bg='#9DBEFC' rounded='lg' mx={5} py={1} px={4}>
        <Flex flexDirection='row' justifyContent='center' align='center'>
          <Text flex={0.3} fontFamily='heading' fontSize='3xl' fontWeight={600} textAlign='center'>
            <Text color='white'>UW</Text>
            <Text color="blue.500">U</Text>
          </Text>
          <Text flex={0.7} fontSize='md' fontWeight={300} color='black' textAlign='center'>
            Gana dinero viendo videos publicitarios.
          </Text>
        </Flex>
      </Box>
      <AnimatedWelcome />
      <Text fontSize='lg' m={6} fontWeight={300} color='white' textAlign='center'>
        ¡Invita a todos a unirse a nuestra comunidad!
      </Text>
      <ReferralBox navigation={navigation} referralCode={subscriptionData?.user?.referral_code} shareReferralCode={shareReferralCode} />
      <Text fontSize='xl' mx={5} my={5} fontWeight={400} color='white'>
        Tareas
      </Text>
      <TasksList navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    width: 100,
    height: 100,
  },
});

export default Home;
