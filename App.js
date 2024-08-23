import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/context/AuthContext"; // Caminho atualizado
import LoginScreen from "./src/screens/auth/LoginScreen"; // Caminho atualizado
import RegisterScreen from "./src/screens/auth/RegisterScreen"; // Caminho atualizado
import HomeScreen from "./src/screens/HomeScreen"; // Caminho atualizado
import { useContext } from "react";
import { AuthContext } from "./src/context/AuthContext"; // Caminho atualizado
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#4CAF50",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerTitle: "Login de Usuário" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerTitle: "Registro de Usuário" }}
    />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#4CAF50",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: "Bem-vindo",
        headerTitleAlign: "center",
        headerRight: () => (
          <Icon.Button
            name="settings"
            size={25}
            backgroundColor="#4CAF50"
            onPress={() => alert("Settings Pressed")}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; // Ou um componente de carregamento
  }

  return (
    <NavigationContainer>
      {userToken ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
