import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { IPost } from '../../interfaces';
import { formatRelativeDate, DEFAULT_AVATAR_URL } from '../../utils';
import { Tag } from '../Tags';
import {
  PostCard,
  PostImageContainer,
  PostImage,
  ImagePlaceholder,
  PostContent,
  PostText,
  PostTags,
  PostMeta,
  AuthorInfo,
  AuthorAvatar,
  AuthorName,
  PostDate,
  PostStats,
  StatItem,
} from './Posts.styles';

interface PostItemProps {
  post: IPost;
  onClick: () => void;
  index: number;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onClick, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const authorName = `${(post.owner as any)?.firstName || 'Unknown'} ${(post.owner as any)?.lastName || 'Author'}`;
  const authorPicture = (post.owner as any)?.picture || DEFAULT_AVATAR_URL; // Use default avatar

  return (
    <PostCard
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <PostImageContainer>
        {!imageLoaded && !imageError && <ImagePlaceholder />}
        <PostImage
          src={post.image || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={post.text}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </PostImageContainer>

      <PostContent>
        <PostText>{post.text}</PostText>

        <PostTags>
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} $size="sm" as="span">
              #{tag}
            </Tag>
          ))}
        </PostTags>

        <PostMeta>
          <AuthorInfo>
            <AuthorAvatar src={authorPicture} alt={authorName} />
            <div>
              <AuthorName>{authorName}</AuthorName>
              <PostDate>{formatRelativeDate(post.publishDate || new Date().toISOString())}</PostDate>
            </div>
          </AuthorInfo>

          <PostStats>
            <StatItem>
              <Heart size={16} />
              {post.likes}
            </StatItem>
          </PostStats>
        </PostMeta>
      </PostContent>
    </PostCard>
  );
};