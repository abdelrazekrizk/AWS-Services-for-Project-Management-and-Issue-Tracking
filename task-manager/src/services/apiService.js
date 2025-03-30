import axios from 'axios';

const API_URL = 'YOUR_API_GATEWAY_INVOKE_URL'; // Replace with your API Gateway URL

export const createTask = async (taskData) => {
    return await axios.post(`${API_URL}/tasks`, taskData);
};

export const updateTask = async (taskData) => {
    return await axios.put(`${API_URL}/tasks`, taskData);
};

export const deleteTask = async (UserId, TaskId) => {
    return await axios.delete(`${API_URL}/tasks/${UserId}/${TaskId}`);
};

export const getTask = async (UserId, TaskId) => {
    return await axios.get(`${API_URL}/tasks/${UserId}/${TaskId}`);
};