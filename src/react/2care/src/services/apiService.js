
const BASE_URL = "http://127.0.0.1:8000";

export const apiService = {
  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  // Adicione outras funções para GET, PUT, DELETE conforme necessário
};