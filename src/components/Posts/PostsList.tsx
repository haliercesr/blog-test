import React from 'react';
import { usePosts, useComments } from '../../hooks';
import { useUIContext } from '../../context';
import { PostItem } from './PostItem';
import { CommentsModal } from '../Comments';
import { PostsGrid, LoadMoreButton, EmptyState } from './Posts.styles';

export const PostsList: React.FC = () => {
  const { posts, isLoading, hasMore, loadMore } = usePosts();
  const { openPostComments, selectedPost, comments, closeComments } = useComments();
  const { openModal, closeModal } = useUIContext();

  const handlePostClick = async (post: typeof posts[0]) => {
    await openPostComments(post);
    openModal(
      <CommentsModal
        post={post}
        comments={comments}
        onClose={() => {
          closeComments();
          closeModal();
        }}
      />,
      'Comentarios'
    );
  };

  if (!isLoading && posts.length === 0) {
    return (
      <EmptyState>
        <h3>No hay posts disponibles</h3>
        <p>Intenta con otro filtro o vuelve más tarde</p>
      </EmptyState>
    );
  }

  return (
    <>
      <PostsGrid>
        {posts.map((post, index) => (
          <PostItem
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post)}
            index={index}
          />
        ))}
      </PostsGrid>

      {hasMore && (
        <LoadMoreButton onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Cargar más'}
        </LoadMoreButton>
      )}
    </>
  );
};
