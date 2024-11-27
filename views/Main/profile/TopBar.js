import { Avatar, Text, Icon, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import AvatarSummary from '../../../assets/img/Avatar.jpg';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import useAuthStore from '../../../store/useAuthStore'; // Importa el hook de Zustand

export const ProfileTobBar = () => {
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout); // Obtén la función de logout desde el store

  const handleLogout = () => {
    logout(); // Llama a la función de logout
  };

  return (
    <HStack alignItems="center" justifyContent="space-between" bg="primaryBg" p={4}>
      <TouchableOpacity onPress={() => navigation.navigate("Summary")}>
        <Avatar size="md" source={AvatarSummary} />
      </TouchableOpacity>
      <Text fontSize="lg" color="white">Perfil</Text>
      <Icon onPress={handleLogout} as={MaterialIcons} name="exit-to-app" size={6} />
    </HStack>
  );
};