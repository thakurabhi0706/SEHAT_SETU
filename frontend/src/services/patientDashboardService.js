import api from "../api/axios";

export const getPatientDashboard =
  async () => {

    const response =
      await api.get(
        "/patient/dashboard"
      );

    return response.data;
};