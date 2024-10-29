import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const register = async (
  username: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
  }
};
