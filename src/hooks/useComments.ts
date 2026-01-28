import { useCallback } from 'react';
import { postsApi } from '../api';
import { usePostsContext, useUIContext } from '../context';

export const useComments = () => {
  const { comments, setComments, selectedPost, setSelectedPost } = usePostsContext();
  const { showLoader, hideLoader, openModal } = useUIContext();

  const fetchComments = useCallback(async (postId: string) => {
    showLoader('Cargando comentarios...');
    
    try {
      const response = await postsApi.getPostComments(postId);
      setComments(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader, setComments]);

  const openPostComments = useCallback(async (post: typeof selectedPost) => {
    if (!post) return;
    
    setSelectedPost(post);
    await fetchComments(post.id);
  }, [setSelectedPost, fetchComments]);

  const closeComments = useCallback(() => {
    setSelectedPost(null);
    setComments([]);
  }, [setSelectedPost, setComments]);

  return {
    comments,
    selectedPost,
    fetchComments,
    openPostComments,
    closeComments,
  };
};
