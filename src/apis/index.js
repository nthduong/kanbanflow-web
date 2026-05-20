import axios from "axios";
import { API_ROOT } from "~/utils/constants";
// Board APIs
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};

export const updateBoardDetailsAPI = async (boardId, data) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, data);
  return response.data;
};

export const moveCardInTheDifferentColumnAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, data);
  return response.data;
};
// Column APIs
export const createNewColumnAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, data);
  return response.data;
};

export const updateColumnDetailsAPI = async (columnId, data) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, data);
  return response.data;
};
// Card APIs
export const createNewCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, data);
  return response.data;
};
