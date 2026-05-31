import axios from "axios";

const API_URL =
  "http://localhost:5000/api/appointments";

export const bookAppointment = async (
  appointmentData
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/book`,
    appointmentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPatientAppointments =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/patient`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};


export const completeAppointment =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};

export const getDoctorAppointments =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/doctor`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};

export const acceptAppointment =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/accept/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};

export const rejectAppointment =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};