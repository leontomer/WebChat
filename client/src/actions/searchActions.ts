import axios from "axios";

const API_URL = "http://localhost:5000";

export const searchUser = async (searchTerm: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/searchUser/${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("search failed", error);
  }
};
