import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  const login = async (username, password) => {
    try {
      console.log("a");
      const response = await api.post("/users/login", {
        username,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.message)
      } else {
        console.log(error);
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Falha ao remover o token:", error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro de conexão. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ userToken, login, logout, errorMessage, isLoading, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
