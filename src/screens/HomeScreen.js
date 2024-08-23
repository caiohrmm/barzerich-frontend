import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao Barzerich!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
