import { useCallback, useEffect } from 'react';
import { usePostsContext } from '../context';

export const useTags = () => {
  const { posts, tags, setTags, selectedTag, setSelectedTag } = usePostsContext();

  // Extract unique tags from all available posts
  const extractUniqueTags = useCallback(() => {
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = Array.from(new Set(allTags));
    setTags(uniqueTags.sort()); // Sort alphabetically
  }, [posts, setTags]);

  useEffect(() => {
    extractUniqueTags();
  }, [posts, extractUniqueTags]);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(prevTag => (prevTag === tag ? null : tag));
  }, [setSelectedTag]);

  const clearSelectedTag = useCallback(() => {
    setSelectedTag(null);
  }, [setSelectedTag]);

  return {
    tags,
    selectedTag,
    handleTagClick,
    clearSelectedTag,
  };
};