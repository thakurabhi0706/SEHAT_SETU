import api from "../api/axios";

export const getAdminSettings =
  async () => {

    const response =
      await api.get(
        "/admin/settings"
      );

    return response.data;
};