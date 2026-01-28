import axiosInstance from './axiosInstance';
import { IPost, IComment, IApiResponse } from '../interfaces';

export const postsApi = {
  // Get all posts with pagination
  getPosts: async (page: number = 0, limit: number = 20): Promise<IApiResponse<IPost>> => {
    const response = await axiosInstance.get<IApiResponse<IPost>>('/post', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get posts by tag
  getPostsByTag: async (tag: string, page: number = 0, limit: number = 20): Promise<IApiResponse<IPost>> => {
    const response = await axiosInstance.get<IApiResponse<IPost>>(`/tag/${tag}/post`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single post
  getPost: async (id: string): Promise<IPost> => {
    const response = await axiosInstance.get<IPost>(`/post/${id}`);
    return response.data;
  },

  // Get post comments
  getPostComments: async (postId: string, page: number = 0, limit: number = 50): Promise<IApiResponse<IComment>> => {
    const response = await axiosInstance.get<IApiResponse<IComment>>(`/post/${postId}/comment`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Get all available tags
  getTags: async (): Promise<{ data: string[] }> => {
    const response = await axiosInstance.get<{ data: string[] }>('/tag');
    return response.data;
  },
};
