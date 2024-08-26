import React, { useContext, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../HomeScreen";
import EditUserScreen from "./../endpoints/EditUserScreen";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomersScreen from "./../endpoints/CustomersScreen";
import ProductsScreen from "./../endpoints/ProductsScreen";
import OrdersScreen from "./../endpoints/OrdersScreen";
import CategoriesScreen from "./../endpoints/CategoriesScreen";
import { AuthContext } from "../../context/AuthContext";
import CustomModal from "../../utils/customModal";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = async () => {
    setModalVisible(false);
    await logout();
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.headerContainer}></View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
      >
        <DrawerItem
          label="Home"
          icon={() => (
            <Icon name="home-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Home")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Editar Perfil"
          icon={() => (
            <Icon name="person-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Editar Perfil")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Clientes"
          icon={() => (
            <Icon name="people-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Clientes")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Produtos"
          icon={() => (
            <Icon name="cart-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Products")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Pedidos"
          icon={() => (
            <Icon name="receipt-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Orders")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Categorias"
          icon={() => (
            <Icon name="pricetag-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={() => props.navigation.navigate("Categories")}
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Logout"
          icon={() => (
            <Icon name="log-out-outline" size={24} style={styles.iconStyle} />
          )}
          onPress={handleLogout}
          labelStyle={[styles.drawerItemLabel, styles.logoutLabel]}
        />
      </DrawerContentScrollView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmLogout}
        message="Você deseja fazer logout?"
      />
    </View>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerStyle: { backgroundColor: "#DAA520" },
      headerTintColor: "#fff",
      drawerActiveTintColor: "#DAA520",
      drawerInactiveTintColor: "#333",
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Editar Perfil" component={EditUserScreen} />
    <Drawer.Screen name="Clientes" component={CustomersScreen} />
    <Drawer.Screen name="Products" component={ProductsScreen} />
    <Drawer.Screen name="Orders" component={OrdersScreen} />
    <Drawer.Screen name="Categories" component={CategoriesScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fundo do menu
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#DAA520", // Cor de fundo do cabeçalho
    alignItems: "center",
    marginBottom: 8,
    height: 91,
    position: "relative",
  },
  drawerHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    left: 10,
    bottom: 0, // Cor do texto do cabeçalho
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  iconStyle: {
    color: "#DAA520", // Cor dos ícones
  },
  drawerItemLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333", // Cor do texto dos itens
  },
  logoutLabel: {
    color: "#e53935", // Cor específica para o item de logout
  },
});

export default DrawerNavigator;
