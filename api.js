import axios from "axios";

const BASE_URL = "https://67404ffcd0b59228b7ef8602.mockapi.io/User/User";

export const createTask = async (taskData) => {
  try {
    const newTask = {
      ...taskData,
      createdAt: new Date().toISOString(),
    };

    const response = await axios.post(BASE_URL, newTask);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks:", error);
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const updatedTask = {
      ...updatedData,
      createdAt: updatedData.createdAt || new Date().toISOString(),
    };

    const response = await axios.put(`${BASE_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
