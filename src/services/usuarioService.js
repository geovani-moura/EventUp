import { fetchJson } from "./api";
const PATH = "/Users";

export const getUsers = async () => {
  return await fetchJson(PATH);
};

export const getUserById = async (id) => {
  return await fetchJson(`${PATH}/${id}`);
};

export const registerUser = async (userData) => {
  return await fetchJson(PATH, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (id, updatedData) => {
  return await fetchJson(`${PATH}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
};

export const loginUser = async (email, password) => {
  const users = await getUsers();
  return users.find((u) => u.email === email && u.password === password) || null;
};
