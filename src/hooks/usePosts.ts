import { useState, useEffect, useCallback, useMemo } from 'react';
import { postsApi } from '../api';
import { usePostsContext } from '../context';
import { useUIContext } from '../context';

export const usePosts = () => {
  const { posts, setPosts, addPosts, clearPosts, setLoading, isLoading, selectedTag, setTags } = usePostsContext();
  const { showLoader, hideLoader } = useUIContext();
  const [page, setPage] = useState(0); // Represents 'skip' in dummyjson.com as page * limit
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPosts = useCallback(async (pageNum: number = 0, reset: boolean = false) => {
    if (isLoading) return;
    
    setLoading(true);
    showLoader('Cargando posts...');
    
    try {
      const response = await postsApi.getPosts(pageNum, 12);
      
      if (reset) {
        setPosts(response.data);
      } else {
        addPosts(response.data);
      }
      
      setTotal(response.total);
      setHasMore((pageNum + 1) * 12 < response.total);
      setPage(pageNum);

      // Extract and set unique tags from all fetched posts
      const allTags = response.data.flatMap(post => post.tags);
      const uniqueTags = Array.from(new Set(allTags));
      setTags(uniqueTags.sort());

    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }, [isLoading, setLoading, showLoader, hideLoader, setPosts, addPosts, setTags]);

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
  }, []);

  // Client-side filtering based on selectedTag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return posts;
    }
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return {
    posts: filteredPosts, // Return filtered posts
    isLoading,
    hasMore,
    total,
    loadMore,
    refresh,
  };
};