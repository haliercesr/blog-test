import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { IPost, IComment } from '../../interfaces';
import { formatRelativeDate } from '../../utils';
import { postsApi } from '../../api';
import {
  CommentsContainer,
  PostPreview,
  PostPreviewImage,
  PostPreviewContent,
  PostPreviewText,
  PostPreviewAuthor,
  CommentsList,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentDate,
  CommentMessage,
  NoComments,
  CommentsCount,
} from './Comments.styles';

interface CommentsModalProps {
  post: IPost;
  comments: IComment[];
  onClose: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await postsApi.getPostComments(post.id.toString()); // Ensure post.id is string
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [post.id]);

  // dummyjson.com comments have 'user.username' instead of 'owner.firstName/lastName'
  // and no 'owner.picture'. Using a generic avatar.
  const postAuthorName = `${(post.owner as any)?.firstName || 'Unknown'} ${(post.owner as any)?.lastName || 'Author'}`;

  return (
    <CommentsContainer>
      <PostPreview>
        <PostPreviewImage src={post.image || 'https://via.placeholder.com/80'} alt={post.text} />
        <PostPreviewContent>
          <PostPreviewText>{post.text}</PostPreviewText>
          <PostPreviewAuthor>
            Por {postAuthorName}
          </PostPreviewAuthor>
        </PostPreviewContent>
      </PostPreview>

      {loading ? (
        <NoComments>
          <p>Cargando comentarios...</p>
        </NoComments>
      ) : comments.length > 0 ? (
        <>
          <CommentsCount>
            <MessageCircle size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            {comments.length} comentario{comments.length !== 1 ? 's' : ''}
          </CommentsCount>
          <CommentsList>
            {comments.map((comment) => (
              <CommentItem key={comment.id}>
                <CommentAvatar src={`https://i.pravatar.cc/150?img=${comment.user.id}`} alt={comment.user.username} />
                <CommentContent>
                  <div>
                    <CommentAuthor>
                      {comment.user.username}
                    </CommentAuthor>
                    <CommentDate>{formatRelativeDate(comment.publishDate || new Date().toISOString())}</CommentDate>
                  </div>
                  <CommentMessage>{comment.message}</CommentMessage>
                </CommentContent>
              </CommentItem>
            ))}
          </CommentsList>
        </>
      ) : (
        <NoComments>
          <MessageCircle size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <p>Aún no hay comentarios</p>
        </NoComments>
      )}
    </CommentsContainer>
  );
};