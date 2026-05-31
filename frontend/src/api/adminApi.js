import api from "./axios";

export const getPendingDoctors = async () => {
  const response = await api.get("/admin/pending-doctors");
  return response.data;
};

export const approveDoctor = async (doctorId) => {
  const response = await api.put(`/admin/approve-doctor/${doctorId}`);
  return response.data;
};

export const rejectDoctor = async (doctorId) => {
  const response = await api.put(`/admin/reject-doctor/${doctorId}`);
  return response.data;
};