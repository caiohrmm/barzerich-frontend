import api from "./api"; // Certifique-se de importar o axios configurado

/**
 * Recupera o perfil do usuário utilizando o token.
 * @param {string} token - O token de autenticação do usuário.
 * @returns {Promise<Object>} - A resposta da API com os dados do perfil do usuário.
 */
export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao recuperar perfil."
    );
  }
};


