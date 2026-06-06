import api from "../api/axios";

export const getAllAppointments =
  async () => {

    const response =
      await api.get(
        "/admin/appointments"
      );

    return response.data;
};