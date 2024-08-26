import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { getUserProfile } from "../../utils/apiUtils";

const EditUserScreen = () => {
  const { userToken } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // Animação para popups
  const [user, setUser] = useState({}); // Inicializar como objeto vazio

  useEffect(() => {
    // Função para recuperar o perfil do usuário
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(userToken);
        setUser(data.user); // Ajuste conforme a estrutura do retorno da API
        setUsername(data.user.username); // Definir o valor do username
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUserProfile();
  }, [userToken]);

  useEffect(() => {
    if (errorMessage || successMessage) {
      console.log("Iniciando animação para popup...");
      // Faz o popup aparecer
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Log para verificar se a animação começou
        console.log("Animação de popup iniciada.");
      });

      // Remove o popup após 3 segundos
      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Log para verificar se a animação terminou
          console.log("Animação de popup encerrada.");
        });
      }, 3000);

      return () => clearTimeout(timeout); // Limpa o timeout se o componente desmontar
    }
  }, [errorMessage, successMessage]);

  const handleSave = async () => {
    try {
      const response = await api.patch(
        "/users/edit",
        {
          username,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Atualiza o perfil do usuário após sucesso
      const updatedUser = await getUserProfile(userToken);
      setUser(updatedUser.user); // Atualiza o estado com as novas informações
      setUsername(updatedUser.user.username); // Atualiza o valor do campo de entrada

      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Limpa a mensagem de erro ao ter sucesso
      // Limpa os campos após sucesso
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao atualizar usuário."
      );
      setSuccessMessage(""); // Limpa a mensagem de sucesso ao ter erro
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu nome de usuário"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Senha Atual</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Digite sua senha atual"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nova Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Digite sua nova senha"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirme sua nova senha"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      {/* Popup de Mensagens */}
      {(errorMessage || successMessage) && (
        <Animated.View
          style={[
            styles.popup,
            { opacity: fadeAnim },
            errorMessage ? styles.error : styles.success,
          ]}
        >
          <Text style={styles.popupText}>{errorMessage || successMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
    position: "relative"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#DAA520",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    top: 10,
    left: "10%",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Garante que o popup esteja sobre outros componentes
  },
  popupText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    backgroundColor: "#f44336", // Vermelho para erro
  },
  success: {
    backgroundColor: "#4CAF50", // Verde para sucesso
  },
});

export default EditUserScreen;
