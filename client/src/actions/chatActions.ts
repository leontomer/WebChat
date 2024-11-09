import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchUserLatestChats = async (user: string | null | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/getLatestChats/${user}`);
    return response.data;
  } catch (error) {
    console.error("fetching chats failed", error);
  }
};
