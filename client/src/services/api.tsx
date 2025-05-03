import axios, { AxiosResponse } from 'axios';

// Define a type for the user data
export interface User {
  id: number;
  name: string;
}

// Create the Axios instance with the base URL
const api = axios.create({ 
  baseURL: 'http://localhost:3000',  // Replace with your NestJS backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Get all users from the API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await api.get('/users'); // Replace with your route
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  // Optionally throw an error for higher-level handling
  }
};

// Example: Create a new user via the API
export const createUser = async (userData: { name: string }): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.post('/users', userData); // Replace with your route
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;  // Optionally throw an error for higher-level handling
  }
};

// Example: Update user data via the API
export const updateUser = async (userId: number, userData: { name: string }): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.put(`/users/${userId}`, userData); // Replace with your route
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;  // Optionally throw an error for higher-level handling
  }
};

// Example: Delete a user via the API
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`); // Replace with your route
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;  // Optionally throw an error for higher-level handling
  }
};
