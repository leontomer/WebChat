import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchUserLatestChats = async (user: string | null | undefined) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/getLatestChats/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("fetching chats failed", error);
  }
};
