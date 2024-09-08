import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import { Main, Auth } from "./NavigationStack";
import { AuthContext, AuthProvider } from "./AuthContext";
import theme from "./style/theme";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <Box bg='primaryBg' flex={1}>
            <NavigationContainer>
              <AuthContext.Consumer>
                {({ isAuthenticated }) => isAuthenticated ? <Main /> : <Auth />}
              </AuthContext.Consumer>
            </NavigationContainer>
          </Box>
        </AuthProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
