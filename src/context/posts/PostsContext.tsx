import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IPost, IComment } from '../../interfaces';

interface PostsContextType {
  posts: IPost[];
  selectedPost: IPost | null;
  comments: IComment[];
  // selectedTag: string | null; // Removed
  // tags: string[]; // Removed
  isLoading: boolean;
  setPosts: (posts: IPost[]) => void;
  addPosts: (posts: IPost[]) => void;
  setSelectedPost: (post: IPost | null) => void;
  setComments: (comments: IComment[]) => void;
  // setSelectedTag: (tag: string | null) => void; // Removed
  // setTags: (tags: string[]) => void; // Removed
  setLoading: (loading: boolean) => void;
  clearPosts: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  // const [selectedTag, setSelectedTag] = useState<string | null>(null); // Removed
  // const [tags, setTags] = useState<string[]>([]); // Removed
  const [isLoading, setIsLoading] = useState(false);

  const addPosts = useCallback((newPosts: IPost[]) => {
    setPosts((prev) => [...prev, ...newPosts]);
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
  }, []);

  const value: PostsContextType = {
    posts,
    selectedPost,
    comments,
    // selectedTag, // Removed
    // tags, // Removed
    isLoading,
    setPosts,
    addPosts,
    setSelectedPost,
    setComments,
    // setSelectedTag, // Removed
    // setTags, // Removed
    setLoading: setIsLoading,
    clearPosts,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export const usePostsContext = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }
  return context;
};