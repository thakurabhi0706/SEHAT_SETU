import axios from "axios";

const API_URL =
  "http://localhost:5000/api/medical-reports";

export const uploadReport =
  async (formData) => {
    console.log(API_URL);
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};




export const deleteReport = async (id) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPatientReports =
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