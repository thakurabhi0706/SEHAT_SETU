import axios from "axios";

const API_URL =
  "http://localhost:5000/api/doctor";

export const updateAvailability = async (
  availabilitySlots
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/availability`,
    { availabilitySlots },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};