import axiosInstance from './axiosInstance';
import { IPost, IComment, IApiResponse } from '../interfaces';

// Define specific response types for dummyjson.com
interface DummyJsonPostsResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyJsonCommentsResponse {
  comments: IComment[];
  total: number;
  skip: number;
  limit: number;
}

export const postsApi = {
  // Get all posts with pagination
  getPosts: async (page: number = 0, limit: number = 12): Promise<IApiResponse<IPost>> => {
    const response = await axiosInstance.get<DummyJsonPostsResponse>('/posts', {
      params: { skip: page * limit, limit },
    });
    return {
      data: response.data.posts.map(post => ({
        ...post,
        text: post.body, // Map 'body' to 'text' for compatibility
        likes: post.reactions.likes, // Map 'reactions.likes' to 'likes'
        image: `https://picsum.photos/seed/${post.id}/600/400`, // Placeholder image as dummyjson posts don't have one
        publishDate: new Date().toISOString(), // Placeholder date
        owner: { // Placeholder owner for compatibility, will need to fetch actual user if needed
          id: post.userId.toString(),
          firstName: `User`,
          lastName: `${post.userId}`,
          picture: `https://i.pravatar.cc/150?img=${post.userId}`,
          email: `user${post.userId}@example.com`,
          title: 'user',
        } as any, // Cast to any to match IPost owner type temporarily
      })),
      total: response.data.total,
      page: response.data.skip / response.data.limit,
      limit: response.data.limit,
    };
  },

  // getPostsByTag is removed as dummyjson.com does not have a direct endpoint for this.
  // getTags is removed as dummyjson.com does not have a direct endpoint for this.

  // Get single post
  getPost: async (id: string): Promise<IPost> => {
    const response = await axiosInstance.get<IPost>(`/posts/${id}`);
    return {
      ...response.data,
      text: response.data.body,
      likes: response.data.reactions.likes,
      image: `https://picsum.photos/seed/${response.data.id}/600/400`, // Placeholder image
      publishDate: new Date().toISOString(), // Placeholder date
      owner: { // Placeholder owner
        id: response.data.userId.toString(),
        firstName: `User`,
        lastName: `${response.data.userId}`,
        picture: `https://i.pravatar.cc/150?img=${response.data.userId}`,
        email: `user${response.data.userId}@example.com`,
        title: 'user',
      } as any,
    };
  },

  // Get post comments
  getPostComments: async (postId: string, page: number = 0, limit: number = 50): Promise<IApiResponse<IComment>> => {
    const response = await axiosInstance.get<DummyJsonCommentsResponse>(`/posts/${postId}/comments`, {
      params: { skip: page * limit, limit },
    });
    return {
      data: response.data.comments.map(comment => ({
        ...comment,
        message: comment.body, // Map 'body' to 'message' for compatibility
        publishDate: new Date().toISOString(), // Placeholder date
      })),
      total: response.data.total,
      page: response.data.skip / response.data.limit,
      limit: response.data.limit,
    };
  },
};