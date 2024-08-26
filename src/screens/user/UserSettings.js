import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const UserSettings = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Configurações do Usuário</Text>
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

export default UserSettings;
