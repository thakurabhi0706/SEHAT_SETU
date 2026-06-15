import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_BASE_URL}/doctor`;

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