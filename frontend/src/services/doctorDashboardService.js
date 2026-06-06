import api from "../api/axios";

export const getDoctorDashboard =
  async () => {

    const response =
      await api.get(
        "/doctor/dashboard"
      );

    return response.data;
};