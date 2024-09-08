import { Box, Button, VStack, View } from 'native-base';
import { Pressable, PressableProps, StyleProp, ViewStyle, Animated } from "react-native";

export const PressableScale = ({ scale, style, children, ...otherProps }) => {
    const animation = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animation, {
            toValue: scale ?? 1.1,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}  {...otherProps}>
            <Animated.View
                style={[
                    style,
                    {
                        transform: [{ scale: animation }],
                    },
                ]}
            >
                <VStack maxHeight='auto' maxW='auto'  {...otherProps}>
                        {children}
                </VStack>
            </Animated.View>
        </Pressable>
    );
};