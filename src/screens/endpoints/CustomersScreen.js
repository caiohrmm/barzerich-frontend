import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const CustomersScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const formattedCustomers = response.data.map((customer) => ({
        ...customer,
        data_criacao: new Date(customer.data_criacao).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setCustomers(formattedCustomers);
    } catch (error) {
      setErrorMessage("Erro ao carregar clientes.");
    }
  };

  const searchCustomers = async () => {
    if (!searchQuery) {
      return fetchCustomers();
    }

    try {
      const response = await api.get(
        `/customers/findbyname/search?name=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const formattedCustomers = response.data.map((customer) => ({
        ...customer,
        data_criacao: new Date(customer.data_criacao).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setCustomers(formattedCustomers);
    } catch (error) {
      setErrorMessage("Nenhum cliente encontrado com esse nome.");
    }
  };

  const handleAddCustomer = async () => {
    if (!newCustomerName) return;

    try {
      await api.post(
        "/customers",
        { nome: newCustomerName },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setModalVisible(false);
      setNewCustomerName("");
      fetchCustomers(); // Atualiza a lista após adicionar o novo cliente
    } catch (error) {
      setErrorMessage("Erro ao adicionar cliente.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar cliente por nome"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={searchCustomers}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Cliente</Text>
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.customerItem}>
              <View>
                <Text style={styles.customerName}>{item.nome}</Text>
                <Text style={styles.customerDate}>{item.data_criacao}</Text>
              </View>
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="create-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="trash-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Cliente</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do cliente"
              value={newCustomerName}
              onChangeText={setNewCustomerName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddCustomer}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  customerItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerName: {
    fontSize: 18,
    color: "#333",
  },
  customerDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconButton: {
    marginRight: 20,
  },
  errorText: {
    color: "#f44336",
    textAlign: "center",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    width: "100%",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalCancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomersScreen;
