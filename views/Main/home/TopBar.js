import React from 'react';
import { HStack, Avatar, Text, Icon, Button, Box, Flex } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const HomeTopBar = () => {
    return (
        <Box bg={{
            linearGradient: {
                colors: ['#1A202C', '#293751'],
                start: [0, 0],
                end: [1, 0],
            },
        }}
            p={4}
            shadow={3}
            borderBottomRadius="lg"
        >
            <HStack justifyContent="space-between" alignItems="center">
                <Avatar size="md" source={{ uri: 'https://placeimg.com/140/140/any' }} />
                <Text fontSize="lg" fontWeight="bold" color="white">Perfil</Text>
                <Button variant="ghost" onPress={() => console.log('Logout')} _pressed={{ bg: 'rgba(255,255,255,0.1)' }}>
                    <Icon as={MaterialIcons} name="exit-to-app" size={6} color="white" />
                </Button>
            </HStack>
        </Box>
    );
};
