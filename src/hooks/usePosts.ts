import { useState, useEffect, useCallback } from 'react';
import { postsApi } from '../api';
import { usePostsContext } from '../context';
import { useUIContext } from '../context';

export const usePosts = () => {
  const { posts, setPosts, addPosts, clearPosts, setLoading, isLoading } = usePostsContext();
  const { showLoader, hideLoader } = useUIContext();
  const [page, setPage] = useState(0); // Represents 'skip' in dummyjson.com as page * limit
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPosts = useCallback(async (pageNum: number = 0, reset: boolean = false) => {
    if (isLoading) return;
    
    setLoading(true);
    showLoader('Cargando posts...');
    
    try {
      // dummyjson.com uses 'skip' and 'limit' for pagination
      const response = await postsApi.getPosts(pageNum, 12);
      
      if (reset) {
        setPosts(response.data);
      } else {
        addPosts(response.data);
      }
      
      setTotal(response.total);
      // Check if there are more items to load based on total and current loaded items
      setHasMore((pageNum + 1) * 12 < response.total);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }, [isLoading, setLoading, showLoader, hideLoader, setPosts, addPosts]);

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
  }, []); // No dependency on selectedTag anymore

  return {
    posts,
    isLoading,
    hasMore,
    total,
    loadMore,
    refresh,
  };
};