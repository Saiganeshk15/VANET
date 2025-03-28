import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const storeMaliciousMessage = async (message) => {
  const vehicleId = localStorage.getItem("vehicleId"); // ✅ Ensure we send vehicleId
  if (!vehicleId) {
    throw new Error("Vehicle ID not found in localStorage");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/check-message`,
      { message, vehicleId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ✅ Ensures cookies/session are sent
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error storing message:", error.response?.data || error);
    throw error;
  }
};


export const registerVehicle = async (vehicleId, owner) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { vehicleId, owner });
  return response.data;
};

// export const storeMaliciousMessage = async (vehicleId, message) => {
//   const response = await axios.post(`${API_BASE_URL}/check-message`, { vehicleId, message });
//   console.log(response.data);
//   return response.data;
// };

export const fetchBlockchainRecords = async () => {
  const response = await axios.get(`${API_BASE_URL}/records`);
  return response.data;
};

export const isUserBlocked = async (vehicleId) => {
  const response = await axios.get(`${API_BASE_URL}/is-blocked/${vehicleId}`);
  return response.data;
};
