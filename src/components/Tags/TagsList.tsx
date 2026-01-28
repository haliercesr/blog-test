import React from 'react';
import { X } from 'lucide-react';
import { useTags } from '../../hooks';
import {
  TagsSection,
  TagsTitle,
  TagsContainer,
  Tag,
  ClearButton,
  TagsHeader,
} from './Tags.styles';

export const TagsList: React.FC = () => {
  const { tags, selectedTag, selectTag } = useTags();

  return (
    <TagsSection>
      <TagsHeader>
        <TagsTitle>Filtrar por Tags</TagsTitle>
        {selectedTag && (
          <ClearButton onClick={() => selectTag(null)}>
            <X size={14} />
            Limpiar
          </ClearButton>
        )}
      </TagsHeader>
      <TagsContainer>
        {tags.slice(0, 20).map((tag) => (
          <Tag
            key={tag}
            $active={selectedTag === tag}
            onClick={() => selectTag(tag)}
          >
            #{tag}
          </Tag>
        ))}
      </TagsContainer>
    </TagsSection>
  );
};
