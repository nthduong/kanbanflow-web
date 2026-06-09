import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizedAxios";
import { API_ROOT } from "~/utils/constants";

// Board APIs
export const createNewBoardAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards`, data);
  return response.data;
};

export const fetchBoardAPI = async (searchPage) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards${searchPage}`);
  return response.data;
};

export const updateBoardDetailsAPI = async (boardId, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, data);
  return response.data;
};

export const moveCardInTheDifferentColumnAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, data);
  return response.data;
};

// Column APIs
export const createNewColumnAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, data);
  return response.data;
};

export const updateColumnDetailsAPI = async (columnId, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, data);
  return response.data;
};
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return response.data;
};

// Card APIs
export const createNewCardAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, data);
  return response.data;
};

export const updateCardDetailAPI = async (cardId, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, data);
  return response.data;
};

// User APIs
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data);
  toast.success("Account created successfully! Please check and verify your account before logging in!");
  return response.data;
};

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data);
  toast.success("Account verify successfully! Now you can logging to enjoy our services!");
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`);
  return response.data;
};
