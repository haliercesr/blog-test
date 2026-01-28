import { useState, useEffect, useCallback } from 'react';
import { postsApi } from '../api';
import { usePostsContext } from '../context';
import { useUIContext } from '../context';

export const usePosts = () => {
  const { posts, setPosts, addPosts, clearPosts, selectedTag, setLoading, isLoading } = usePostsContext();
  const { showLoader, hideLoader } = useUIContext();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPosts = useCallback(async (pageNum: number = 0, reset: boolean = false) => {
    if (isLoading) return;
    
    setLoading(true);
    showLoader('Cargando posts...');
    
    try {
      const response = selectedTag
        ? await postsApi.getPostsByTag(selectedTag, pageNum, 12)
        : await postsApi.getPosts(pageNum, 12);
      
      if (reset) {
        setPosts(response.data);
      } else {
        addPosts(response.data);
      }
      
      setTotal(response.total);
      setHasMore(response.data.length > 0 && (pageNum + 1) * 12 < response.total);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }, [selectedTag, isLoading, setLoading, showLoader, hideLoader, setPosts, addPosts]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchPosts(page + 1);
    }
  }, [hasMore, isLoading, page, fetchPosts]);

  const refresh = useCallback(() => {
    clearPosts();
    setPage(0);
    setHasMore(true);
    fetchPosts(0, true);
  }, [clearPosts, fetchPosts]);

  useEffect(() => {
    refresh();
  }, [selectedTag]);

  return {
    posts,
    isLoading,
    hasMore,
    total,
    loadMore,
    refresh,
  };
};
