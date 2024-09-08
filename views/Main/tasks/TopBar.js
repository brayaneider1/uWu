import { Avatar, Text, Icon, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; import React from 'react'

export const ProfileTobBar = () => {
    return (
        <HStack alignItems="center" justifyContent="space-between" bg="primaryBg" p={4}>
            <Avatar size="md" source={{ uri: 'https://placeimg.com/140/140/any' }} />
            <Text fontSize="lg" color="white">Profile</Text>
            <Icon as={MaterialIcons} name="exit-to-app" size={6} />
        </HStack>)
}
