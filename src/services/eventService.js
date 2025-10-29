import { fetchJson, saveJson, readJson } from "./api";

const STORAGE_KEY = "events_data";
const DATA_PATH = "/data/events.json";

export const getEvents = async () => {
  let events = readJson(STORAGE_KEY);
  if (!events) {
    events = await fetchJson(DATA_PATH);
    saveJson(STORAGE_KEY, events);
  }
  return events;
};

export const getEventById = async (id) => {
  const events = await getEvents();
  return events.find((e) => e.id === Number(id));
};

export const createEvent = async (newEvent) => {
  const events = await getEvents();
  const id = events.length ? events[events.length - 1].id + 1 : 1;
  const event = { ...newEvent, id };
  const updated = [...events, event];

  saveJson(STORAGE_KEY, updated);
  return event;
};

export const updateEvent = async (updatedData) => {
  const events = await getEvents();
  const updated = events.map((e) =>
    e.id === Number(updatedData.id) ? { ...e, ...updatedData } : e
  );

  saveJson(STORAGE_KEY, updated);
  return updated.find((e) => e.id === Number(updatedData.id));
};

export const deleteEvent = async (id) => {
  const events = await getEvents();
  const filtered = events.filter((e) => e.id !== Number(id));
  saveJson(STORAGE_KEY, filtered);
  return true;
};
