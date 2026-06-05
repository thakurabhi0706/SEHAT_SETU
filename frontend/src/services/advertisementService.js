import api from "../api/axios";

export const createAdvertisement = async (data) => {
  const response = await api.post(
    "/ads/create",
    data
  );

  return response.data;
};

export const getAdvertisementsAdmin = async () => {
  const response = await api.get(
    "/ads/admin"
  );

  return response.data;
};

export const getActiveAdvertisements = async () => {
  const response = await api.get("/ads");
  return response.data;
};

export const toggleAdvertisement = async (id) => {
  const response = await api.put(
    `/ads/toggle/${id}`
  );

  return response.data;
};

export const deleteAdvertisement = async (id) => {
  const response = await api.delete(
    `/ads/${id}`
  );

  return response.data;
};