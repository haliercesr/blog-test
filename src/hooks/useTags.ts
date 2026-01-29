import { useCallback, useEffect } from 'react';
import { usePostsContext } from '../context';
import { DEFAULT_TAGS } from '../utils/defaultTags'; // Import default tags

export const useTags = () => {
  const { posts, tags, setTags, selectedTag, setSelectedTag } = usePostsContext();

  // Extract unique tags from all available posts and combine with default tags
  const extractUniqueTags = useCallback(() => {
    const allTagsFromPosts = posts.flatMap(post => post.tags);
    const combinedTags = [...DEFAULT_TAGS, ...allTagsFromPosts]; // Combine default and post tags
    const uniqueTags = Array.from(new Set(combinedTags));
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