import { fetchJson, saveJson, readJson } from "./api";

const STORAGE_KEY = "users_data";
const DATA_PATH = "/data/users.json";

export const getUsers = async () => {
  let users = readJson(STORAGE_KEY);

  if (!users) {
    users = await fetchJson(DATA_PATH);
    saveJson(STORAGE_KEY, users);
  }

  return users;
};

export const registerUser = async (userData) => {
  const users = await getUsers();
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const user = { id, ...userData };
  const updated = [...users, user];
  saveJson(STORAGE_KEY, updated);
  return user;
};

export const loginUser = async (email, password) => {
  const users = await getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  return user || null;
};

export const getUserById = async (id) => {
  const users = await getUsers();
  return users.find((u) => u.id === Number(id));
};

export const updateUser = async (id, updatedData) => {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) return null;

  // Atualiza somente os campos fornecidos
  const updatedUser = { ...users[index], ...updatedData };
  users[index] = updatedUser;

  // Salva novamente no storage
  saveJson(STORAGE_KEY, users);

  return updatedUser;
};
