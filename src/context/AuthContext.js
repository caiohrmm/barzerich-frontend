import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para mensagens de sucesso

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.error("Falha ao carregar o token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/users/login", {
        username,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      setErrorMessage("");
      setSuccessMessage("Login realizado com sucesso!"); // Define a mensagem de sucesso
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro de conexão. Tente novamente mais tarde.");
      }
      setSuccessMessage(""); // Limpa a mensagem de sucesso em caso de erro
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
      setSuccessMessage("Logout realizado com sucesso!"); // Define a mensagem de sucesso
    } catch (error) {
      console.error("Falha ao remover o token:", error);
      setErrorMessage("Falha ao fazer logout. Tente novamente.");
    }
  };

  const register = async (username, password, confirmPassword) => {
    try {
      const response = await api.post("/users/register", {
        username,
        password,
        confirmPassword,
      });

      const token = response.data.token;
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      setErrorMessage("");
      setSuccessMessage("Registro realizado com sucesso!"); // Define a mensagem de sucesso
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro de conexão. Tente novamente mais tarde.");
      }
      setSuccessMessage(""); // Limpa a mensagem de sucesso em caso de erro
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        errorMessage,
        successMessage, // Incluindo successMessage no contexto
        isLoading,
        register,
        clearMessages
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
