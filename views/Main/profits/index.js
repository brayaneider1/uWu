import { Avatar, VStack, Text, Icon, Flex, HStack, Divider, ScrollView, Box } from 'native-base';
import UserAvatar from '../../../assets/img/Avatar.jpg'
import { MaterialIcons } from '@expo/vector-icons'; import React from 'react'
import { useNavigation } from '@react-navigation/native';

function TasksItems({ title, quantity }) {
	return (
		<VStack w='1/2' p={2} position='relative'>
			<Box height={120} bg='primaryGray' rounded='md' p={4} >

				<Text color="gray.400" fontWeight={100} fontSize="md" >{title}</Text>
				<Text color="blue.400" bold fontSize="lg" my={3}>{quantity}</Text>
			</Box>
		</VStack>
	);
}

function Profits({ navigation }) {
	const data = [
		{ text: 'Ganancias de esta semana', value: '450' },
		{ text: 'Ingresos del mes pasado', value: '450' },
		{ text: 'Ingresos de este mes', value: '450' },
		{ text: 'Saldo disponible', value: '450' },
		{ text: 'Ganancias de ayer', value: '450' },
		{ text: 'Ingresos totales', value: '450' },
	]

	return (
		<VStack h="100%" bg="white" alignItems="center" p={4} rounded="lg">
			<Flex width="100%" flexDirection="row" mt={2} justify="space-between" align='center'>
				<Text fontSize="xl" fontWeight={200} color="black">Ganancias</Text>
				<Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} />
			</Flex>
			<ScrollView mt={5}>

				<Flex flexDirection="row" flexWrap="wrap" px={4} justify='space-between' align='center' h="90%" >
					{data.map((item, index) => (
						<TasksItems key={index} title={item.text} quantity={item.value} />
					))}
				</Flex>
			</ScrollView>
		</VStack>
	);
}

export default Profits;