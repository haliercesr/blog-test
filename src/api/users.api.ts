import axiosInstance from './axiosInstance';
import { IUser, IApiResponse } from '../interfaces';

// Define specific response type for dummyjson.com
interface DummyJsonUsersResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

export const usersApi = {
  // Get all users with pagination
  getUsers: async (page: number = 0, limit: number = 20): Promise<IApiResponse<IUser>> => {
    const response = await axiosInstance.get<DummyJsonUsersResponse>('/users', {
      params: { skip: page * limit, limit },
    });
    return {
      data: response.data.users.map(user => ({
        ...user,
        picture: user.image, // Map 'image' to 'picture' for compatibility
        title: user.gender, // Placeholder for title, using gender
      })),
      total: response.data.total,
      page: response.data.skip / response.data.limit,
      limit: response.data.limit,
    };
  },

  // Get single user
  getUser: async (id: string): Promise<IUser> => {
    const response = await axiosInstance.get<IUser>(`/users/${id}`);
    return {
      ...response.data,
      picture: response.data.image, // Map 'image' to 'picture' for compatibility
      title: response.data.gender, // Placeholder for title, using gender
    };
  },
};