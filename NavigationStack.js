import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Box, View, Center } from "native-base";
import { ProfileTobBar } from "./views/Main/profile/TopBar";
import Profile from "./views/Main/profile";
import Tasks from "./views/Main/tasks";
import Home from "./views/Main/home";
import theme from "./style/theme";
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import NotificationPlan from './views/Auth/NotificationPlan';
import ProfileSummary from './views/Main/profileSummary';
import Help from './views/Main/help';
import Profits from './views/Main/profits';
import Whitdrawals from './views/Main/withdrawals';
import Reload from './views/Main/reloads';
import TasksPlan from './views/Main/tasksPlan/tasksPlan';
import { PressableScale } from './components/PressableScale/PressableScale';
import Community from './views/Main/community/community';
import { Reanimated } from 'react-native-reanimated';
import { Animated } from 'react-native';
import { BlurView } from 'expo-blur';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define un componente de carga
const LoadingScreen = () => {
  return (
    <Center flex={1} bg="#011D37">
      <LottieView
        source={require('./assets/lotties/coin.json')} // Asegúrate de tener un archivo Lottie aquí
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </Center>
  );
};

const tabBarStyle = {
  position: 'absolute',
  bottom: 10,
  left: 5,
  right: 5,
  border: null,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 20,
  backgroundColor: '#012240',
  shadowColor: '#000',
  height: 60, // Aumenta la altura del tabbar
  paddingBottom: 10,
  shadowRadius: 10,
};
const getTabBarIcon = (route, focused, size) => {
  let iconName;
  const color = 'white';
  switch (route.name) {
    case 'Suscripciones':
      iconName = 'subscriptions';
      break;
    case 'Tareas':
      iconName = 'groups';
      break;
    case 'Perfil':
      iconName = 'person';
      break;
    default:
      iconName = 'circle';
  }

  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0);

  if (focused) {
    Animated.spring(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.spring(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.spring(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.spring(scale, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <MaterialIcons name={iconName} size={size} color={color} />
      {focused && (
        <Animated.View
          style={{
            position: 'absolute',
            top: -15,
            left: -8,
            right: 0,
            bottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            height: 42,
            width: 42,
            backgroundColor: '#BB6BD9',
            padding: 5,
            marginBottom: 10,
            opacity,
            transform: [{ scale }],
          }}
        >
          <MaterialIcons name={iconName} size={size} color={color} />
        </Animated.View>
      )}
    </View>
  );
};
export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: 300, // Duración de la animación de transición
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: 300, // Duración de la animación de transición
          },
        },
      },
      cardStyle: { backgroundColor: '#011D37' }, // Estilo de la tarjeta para mantener el fondo consistente
    }}
  >
    <MainStack.Screen name="Main" options={{ headerShown: false }}>
      {() => (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) =>
              getTabBarIcon(route, focused, size),
            tabBarStyle: {
              ...tabBarStyle,
              borderTopWidth: 0
              // Aquí se usa el efecto "glass"
            },
            tabBarBackground: () => (
              <BlurView
                tint="dark"
                intensity={50} // Ajusta la intensidad del efecto de desenfoque
                style={{ border: '1px solid transparent' }}
              />
            ),

          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
            style: { backgroundColor: 'transparent' },
          }}

        >
          <Tab.Screen
            name="Suscripciones"
            options={{
              headerShown: false,
              lazy: true, // Retrasa la carga de la pestaña hasta que se haga clic en ella
              lazyPlaceholder: () => <LoadingScreen />, // Pantalla de carga mientras la vista se prepara
            }}
            component={Tasks}
          />
          <Tab.Screen
            name="Tareas"
            options={{
              headerShown: false,
              lazy: true,
              lazyPlaceholder: () => <LoadingScreen />,
            }}
            component={Home}
          />
          <Tab.Screen
            name="Perfil"
            options={{
              header: () => <ProfileTobBar />,
              lazy: true,
              lazyPlaceholder: () => <LoadingScreen />,
            }}
            component={Profile}
          />
        </Tab.Navigator>
      )}
    </MainStack.Screen>
    <MainStack.Screen name="Summary" component={ProfileSummary} />
    <MainStack.Screen name="Community" component={Community} />
    <MainStack.Screen name="TasksPlan" component={TasksPlan} />
    <MainStack.Screen name="Help" component={Help} />
    <MainStack.Screen name="Profits" component={Profits} />
    <MainStack.Screen name="Reload" component={Reload} />
    <MainStack.Screen name="Whitdrawals" component={Whitdrawals} />
    <MainStack.Screen name="NotificationPlan" component={NotificationPlan} />
  </MainStack.Navigator>
);

export const Auth = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="NotificationPlan" component={NotificationPlan} />
  </AuthStack.Navigator>
);
