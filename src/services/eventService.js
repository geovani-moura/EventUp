import { fetchJson, BASE_URL } from "./api";
const PATH = "/Events";

const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const getEvents = async () => {
  return await fetchJson(PATH);
};

export const getEventById = async (id) => {
  return await fetchJson(`${PATH}/${id}`);
};

export const createEvent = async (newEvent) => {
  // se image for dataURL, enviar multipart/form-data
  if (newEvent?.image && typeof newEvent.image === "string" && newEvent.image.startsWith("data:")) {
    const form = new FormData();
    form.append("title", newEvent.title || "");
    form.append("date", newEvent.date || "");
    form.append("location", newEvent.location || "");
    form.append("description", newEvent.description || "");
    const blob = dataURLtoBlob(newEvent.image);
    form.append("image", blob, "image.png");

    const res = await fetch(`${BASE_URL}${PATH}`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error(`Erro ao criar evento: ${res.statusText}`);
    return await res.json();
  }

  return await fetchJson(PATH, {
    method: "POST",
    body: JSON.stringify(newEvent),
  });
};

export const updateEvent = async (updatedData) => {
  if (updatedData?.image && typeof updatedData.image === "string" && updatedData.image.startsWith("data:")) {
    const form = new FormData();
    form.append("title", updatedData.title || "");
    form.append("date", updatedData.date || "");
    form.append("location", updatedData.location || "");
    form.append("description", updatedData.description || "");
    const blob = dataURLtoBlob(updatedData.image);
    form.append("image", blob, "image.png");

    const res = await fetch(`${BASE_URL}${PATH}/${updatedData.id}`, {
      method: "PUT",
      body: form,
    });
    if (!res.ok) throw new Error(`Erro ao atualizar evento: ${res.statusText}`);
    return await res.json();
  }

  return await fetchJson(`${PATH}/${updatedData.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
};

export const deleteEvent = async (id) => {
  await fetchJson(`${PATH}/${id}`, { method: "DELETE" });
  return true;
};
