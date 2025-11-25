import axios from "axios";

const base_url = "http://localhost:8000/api";

export const sendMessage = (data: any) => {
  return axios.post(`${base_url}/messages/`, data);
};

export const getMessages = (userType: string, userId: string) => {
  return axios.get(
    `${base_url}/messages/?user_type=${userType}&user_id=${userId}`
  );
};

export const registerUser = (data: any) => {
  return axios.post(`${base_url}/users/`, data);
};

export const getUsers = () => {
  return axios.get(`${base_url}/users/`);
};
