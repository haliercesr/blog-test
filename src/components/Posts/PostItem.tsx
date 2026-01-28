import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { IPost } from '../../interfaces';
import { formatRelativeDate } from '../../utils';
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

  return (
    <PostCard
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <PostImageContainer>
        {!imageLoaded && !imageError && <ImagePlaceholder />}
        <PostImage
          src={post.image}
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
            <AuthorAvatar src={post.owner.picture} alt={post.owner.firstName} />
            <div>
              <AuthorName>
                {post.owner.firstName} {post.owner.lastName}
              </AuthorName>
              <PostDate>{formatRelativeDate(post.publishDate)}</PostDate>
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
