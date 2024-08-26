import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Animated,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, userToken, errorMessage, successMessage, clearMessages } =
    useContext(AuthContext);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animação para popups

  useEffect(() => {
    if (userToken) {
      // Exibe o popup de sucesso antes de redirecionar
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000); // Ajuste o tempo conforme necessário
    }
  }, [userToken]);

  useEffect(() => {
    // Limpa as mensagens quando o componente é desmontado
    return () => {
      clearMessages();
    };
  }, []);

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
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, successMessage]);

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/background.png")}
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Usuário"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Não tem uma conta? Registre-se</Text>
        </TouchableOpacity>
      </View>

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Para Android
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#DAA520",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Para Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#DAA520",
    marginTop: 15,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  popup: {
    position: "absolute",
    top: 10,
    width: "90%",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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

export default LoginScreen;
