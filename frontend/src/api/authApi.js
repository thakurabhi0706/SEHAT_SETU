import api from "./axios";

/* PATIENT */
export const registerPatient = async (data) => {
  const response = await api.post("/patient/register", data);
  return response.data;
};

export const loginPatient = async (data) => {
  const response = await api.post("/patient/login", data);
  return response.data;
};

export const getPatientProfile = async () => {
  const response = await api.get("/patient/profile");
  return response.data;
};

/* DOCTOR */
export const registerDoctor = async (data) => {
  const response = await api.post("/doctor/register", data);
  return response.data;
};

export const loginDoctor = async (data) => {
  const response = await api.post("/doctor/login", data);
  return response.data;
};

export const getDoctorProfile = async () => {
  const response = await api.get("/doctor/profile");
  return response.data;
};

/* ADMIN */
export const loginAdmin = async (data) => {
  const response = await api.post("/admin/login", data);
  return response.data;
};