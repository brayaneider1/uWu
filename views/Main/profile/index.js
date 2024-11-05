import React, { useState, useEffect } from 'react';
import { Avatar, Box, Text, Icon, VStack, HStack, Flex, Input, ScrollView, Center, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Share, TouchableOpacity } from 'react-native';
import useAuthStore from '../../../store/useAuthStore';
import { getTotalEarnings } from '../../../services/utils/getTotalEarnings';

const menuItems = [
	{ icon: 'money', text: 'Ganancias', stack: "Profits" },
	{ icon: 'help', text: 'Ayuda', stack: "Help" },
	{ icon: 'group', text: 'Comunidad', stack: "Community" },
];

const actions = [
	{ icon: 'autorenew', text: 'Recargar', stack: "Reload" },
	{ icon: 'money-off', text: 'Retirar', stack: "Whitdrawals" },
];

const TasksItem = [
	{ title: 'Tareas completadas', quantity: 5 },
	{ title: 'Tareas restante', quantity: 5 },
];

const ReferralBox = ({ referralCode, shareReferralCode, navigation }) => (
	<HStack
		mt={2}
		bg='#293751'
		width='100%'
		justifyContent='space-between'
		mx='auto'
		px={4}
		py={2}
		my={4}
		borderRadius={10}
		space={2}
		alignItems='center'
	>
		<Text color='gray.200' fontSize='md'>
			Código de invitación: <Text color="secondaryGreen" fontWeight={500}>{referralCode}</Text>
		</Text>
		<Button onPress={shareReferralCode} bg="secondaryGreen" style={{ borderRadius: 5, padding: 5 }}>
			<Icon as={MaterialIcons} color='white' name='share' size={6} />
		</Button>
	</HStack>
);

function MenuItem({ icon, text, navigation, stack }) {
	return (
		<TouchableOpacity onPress={() => navigation.navigate(stack)}>
			<Box justifyContent="center" alignItems="center" mb={4} >
				<Box p={4} bg="primaryGray" borderRadius={5} ><Icon color="blue.300" as={MaterialIcons} name={icon} size={6} /></Box>
				<Text mt={2} fontWeight={400} color="primaryBg">{text}</Text>
			</Box>
		</TouchableOpacity>
	);
}

function ActionItem({ icon, text, navigation, stack }) {
	return (
		<TouchableOpacity onPress={() => navigation.navigate(stack)} >
			<VStack alignItems="center"  >
				<MaterialIcons name={icon} size={24} color="white" />
				<Text color="white">{text}</Text>
			</VStack>
		</TouchableOpacity>
	);
}

function TasksItems({ title, quantity }) {
	return (
		<VStack justifyContent="center" alignItems="center">
			<Text color="primaryGray" fontWeight={100} fontSize="md" >{title}</Text>
			<Text color="blue.400" bold fontSize="lg" my={3}>{quantity}</Text>
		</VStack>
	);
}

function Profile({ navigation }) {
	const { subscriptionData,user } = useAuthStore();
	const code = subscriptionData?.user?.referral_code;
	console.log("🚀 ~ Profile ~ code:", code,user)
	const [totalEarnings, setTotalEarnings] = useState('0'); // State to store total earnings

	
	useEffect(() => {
		const fetchEarnings = async () => {
			const earnings = await getTotalEarnings();
			setTotalEarnings(earnings); 
		};
		
		fetchEarnings();
	}, []);
	
	const shareReferralCode = async () => {
		const message = `¡Únete a nuestra comunidad! \nDescarga la aplicación de UwU en www.uwu.community y usa mi código de invitación para registrarte: ${code}`;
		try {
			await Share.share({ message, url: 'www.uwu.com' });
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};
	return (
		<ScrollView bg="primaryBg" contentContainerStyle={{ flexGrow: 1 }}>
			<Box flex={1} bg="primaryBg">
				<Center flex={1}>
					<VStack alignItems="center" py={5}>
						<Text fontSize="md" color="white">Available Balance</Text>
						<Text fontSize="2xl" bold color="yellow.400">${totalEarnings} COIN</Text>
					</VStack>
				</Center>
			</Box>
			<Box flex={1} bg="white" borderTopLeftRadius={15} borderTopRightRadius={15} p={4}>
				<HStack width="80%" mx="auto" mt={10} justifyContent="space-between" alignItems="center" space={2} p={4}>
					{TasksItem.map((item, index) => (
						<TasksItems key={index} title={item.title} quantity={item.quantity} />
					))}
				</HStack>
				<ReferralBox navigation={navigation} referralCode={code} shareReferralCode={shareReferralCode} />

				<Flex direction="column">
					<Flex direction="row" justify="space-between">
						{menuItems.map((item, index) => (
							<MenuItem navigation={navigation} key={index} stack={item.stack} icon={item.icon} text={item.text} />
						))}
					</Flex>
				</Flex>
				<HStack
					bg="primaryGray"
					position="absolute"
					top={-30}
					left="25%"
					width="60%"
					justifyContent="space-between"
					px={4}
					py={2}
					borderRadius={10}
					shadow={3}
				>
					{actions.map((action, index) => (
						<ActionItem navigation={navigation} key={index} icon={action.icon} text={action.text} stack={action.stack} />
					))}
				</HStack>
			</Box>
		</ScrollView>
	);
}

export default Profile;
