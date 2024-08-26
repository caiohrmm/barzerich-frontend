import "./gesture-handler.native";
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/context/AuthContext"; // Caminho atualizado
import LoginScreen from "./src/screens/auth/LoginScreen"; // Caminho atualizado
import RegisterScreen from "./src/screens/auth/RegisterScreen"; // Caminho atualizado
import HomeScreen from "./src/screens/HomeScreen"; // Caminho atualizado
import { useContext } from "react";
import { AuthContext } from "./src/context/AuthContext"; // Caminho atualizado
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import CustomModal from "./src/utils/customModal";
import DrawerNavigator from "./src/screens/navbar/DrawerNavigator";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#DAA520",
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
      options={{ headerTitle: "Login de Usuário", headerTitleAlign: "center" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerTitle: "Registro de Usuário",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  return (
    <NavigationContainer>
      {userToken ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    marginLeft: 10,
    padding: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
