import api from "../api/axios";

export const getDoctorEarnings =
  async () => {

    const response =
      await api.get(
        "/doctor/earnings"
      );

    return response.data;
};