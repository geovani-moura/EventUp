import { fetchJson } from "./api";
const PATH = "/Events";

export const getEvents = async () => {
  return await fetchJson(PATH);
};

export const getEventById = async (id) => {
  return await fetchJson(`${PATH}/${id}`);
};

export const createEvent = async (newEvent) => {
  return await fetchJson(PATH, {
    method: "POST",
    body: JSON.stringify(newEvent),
  });
};

export const updateEvent = async (updatedData) => {
  return await fetchJson(`${PATH}/${updatedData.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
};

export const deleteEvent = async (id) => {
  await fetchJson(`${PATH}/${id}`, { method: "DELETE" });
  return true;
};
