import axios from "axios";

const API_URL =
  "http://localhost:5000/api/doctor";

export const getAllDoctors = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};



export const getDoctorById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};