import api from "../api/axios";

export const getDoctorPatients =
  async () => {
    const response =
      await api.get(
        "/doctor/patients"
      );

    return response.data;
};