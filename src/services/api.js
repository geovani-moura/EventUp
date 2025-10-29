// src/services/api.js
export const fetchJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Erro ao buscar ${path}: ${response.statusText}`);
  }
  return await response.json();
};

export const saveJson = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const readJson = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
