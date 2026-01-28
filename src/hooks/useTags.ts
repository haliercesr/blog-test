import { useState, useEffect, useCallback } from 'react';
import { postsApi } from '../api';
import { usePostsContext, useUIContext } from '../context';

export const useTags = () => {
  const { tags, setTags, selectedTag, setSelectedTag, clearPosts } = usePostsContext();
  const { showLoader, hideLoader } = useUIContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTags = useCallback(async () => {
    if (tags.length > 0) return;
    
    setIsLoading(true);
    
    try {
      const response = await postsApi.getTags();
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tags.length, setTags]);

  const selectTag = useCallback((tag: string | null) => {
    if (tag === selectedTag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    clearPosts();
  }, [selectedTag, setSelectedTag, clearPosts]);

  useEffect(() => {
    fetchTags();
  }, []);

  return {
    tags,
    selectedTag,
    isLoading,
    selectTag,
    fetchTags,
  };
};
