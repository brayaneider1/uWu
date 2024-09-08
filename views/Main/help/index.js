import { Avatar, VStack, Text, Icon, Flex, HStack, Divider, ScrollView } from 'native-base';
import UserAvatar from '../../../assets/img/Avatar.jpg'
import { MaterialIcons } from '@expo/vector-icons'; import React from 'react'
import { useNavigation } from '@react-navigation/native';

function Help() {
	const navigation = useNavigation();
	const questions = [
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' }
	]
	const questions2 = [
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
		{ value: '¿Lorem ipsum dolor sit amet?' },
	]


	return (
		<VStack h="100%" bg="white" alignItems="center" p={4} rounded="lg">

			<Flex width="100%" flexDirection="row" mt={5} justify="space-between" align='center'>
				<Text fontSize="2xl" fontWeight={200} color="black">Ayuda</Text>
				<Icon onPress={() => navigation.navigate("Perfil")} as={MaterialIcons} name="close" size={6} />
			</Flex>
			<ScrollView>

				<Flex px={4} justify='center' align='center' h="90%" >
					<Text fontSize="lg" fontWeight={500} mx="auto" mt={20}>
						Preguntas frecuentes
					</Text>
					<Divider mx="auto" width={50} my={2} />
					{questions.map(item =>
						<HStack bg="gray.200"
							width={350}
							justifyContent="space-between"
							mx="auto"
							my={2}
							px={4}
							py={5}
							borderRadius={10} space={2} alignItems="center">
							<Text color="gray.400" fontSize="md" >{item.value}</Text>
						</HStack>
					)}

					<Text fontSize="lg" fontWeight={500} mx="auto" mt={4}>
						Enlaces de interes
					</Text>
					<Divider mx="auto" width={50} my={2} />
					{questions2.map(item =>
						<HStack bg="gray.200"
							width={350}
							justifyContent="space-between"
							mx="auto"
							my={2}
							px={4}
							py={5}
							borderRadius={10} space={2} alignItems="center">
							<Text color="gray.400" fontSize="md" >{item.value}</Text>
						</HStack>
					)}
				</Flex>
			</ScrollView>
		</VStack>
	);
}

export default Help;