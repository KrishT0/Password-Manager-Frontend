import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const signUpAPI = async (data) => {
  const response = await axios.post(`${baseURL}auth/signup`, data);
  return response.data;
};

export const loginAPI = async (data) => {
  const response = await axios.post(`${baseURL}auth/login`, data);
  return response.data;
};

export const getPasswordsAPI = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${baseURL}password/get`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addPasswordAPI = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${baseURL}password/create`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editPasswordAPI = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${baseURL}password/edit`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePasswordAPI = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${baseURL}password/delete`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: { id },
  });
  return response.data;
};
