// src/services/api.js
const BASE_URL = "https://6902aedbb208b24affe6cfca.mockapi.io";

export const fetchJson = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${path}: ${response.statusText}`);
  }

  return await response.json();
};
