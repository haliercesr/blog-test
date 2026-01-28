import React from 'react';
import { XCircle } from 'lucide-react';
import { useTags } from '../../hooks';
import { TagsContainer, Tag, ClearFilterButton } from './Tags.styles';

export const TagsList: React.FC = () => {
  const { tags, selectedTag, handleTagClick, clearSelectedTag } = useTags();

  if (tags.length === 0) {
    return null;
  }

  return (
    <TagsContainer>
      {tags.map((tag) => (
        <Tag
          key={tag}
          $size="md"
          $active={selectedTag === tag}
          onClick={() => handleTagClick(tag)}
        >
          #{tag}
        </Tag>
      ))}
      {selectedTag && (
        <ClearFilterButton onClick={clearSelectedTag}>
          <XCircle size={16} />
          Limpiar filtro
        </ClearFilterButton>
      )}
    </TagsContainer>
  );
};