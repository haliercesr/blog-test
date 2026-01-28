import React from 'react';
import { PostsList, TagsList } from '../../components'; // Added TagsList
import { HomeContainer, HomeHeader, HomeTitle, HomeSubtitle } from './Home.styles';

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeHeader>
        <HomeTitle>Descubre Historias</HomeTitle>
        <HomeSubtitle>Explora los últimos posts de nuestra comunidad</HomeSubtitle>
      </HomeHeader>

      <TagsList /> {/* Re-added TagsList */}
      <PostsList />
    </HomeContainer>
  );
};