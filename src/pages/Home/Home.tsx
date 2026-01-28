import React from 'react';
import { PostsList, TagsList } from '../../components';
import { HomeContainer, HomeHeader, HomeTitle, HomeSubtitle } from './Home.styles';

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeHeader>
        <HomeTitle>Descubre Historias</HomeTitle>
        <HomeSubtitle>Explora los últimos posts de nuestra comunidad</HomeSubtitle>
      </HomeHeader>

      <TagsList />
      <PostsList />
    </HomeContainer>
  );
};
