import axiosInstance from './axiosInstance';
import { IUser, IApiResponse } from '../interfaces';

export const usersApi = {
  // Get all users with pagination
  getUsers: async (page: number = 0, limit: number = 20): Promise<IApiResponse<IUser>> => {
    const response = await axiosInstance.get<IApiResponse<IUser>>('/user', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single user
  getUser: async (id: string): Promise<IUser> => {
    const response = await axiosInstance.get<IUser>(`/user/${id}`);
    return response.data;
  },
};
