import axios from "axios";

const API_URL = "http://localhost:5022/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTaskById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: { title: string; description: string; isCompleted: boolean }) => {
  await axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
