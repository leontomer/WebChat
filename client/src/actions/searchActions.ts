import axios from "axios";

const API_URL = "http://localhost:5000";

export const searchUser = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${API_URL}/searchUser/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
  }
};
