import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

const OrdersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao Barzerich!</Text>
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

export default OrdersScreen