import React from 'react';
import { PostsList } from '../../components'; // Removed TagsList
import { HomeContainer, HomeHeader, HomeTitle, HomeSubtitle } from './Home.styles';

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeHeader>
        <HomeTitle>Descubre Historias</HomeTitle>
        <HomeSubtitle>Explora los últimos posts de nuestra comunidad</HomeSubtitle>
      </HomeHeader>

      {/* TagsList removed as dummyjson.com does not support tag filtering directly */}
      <PostsList />
    </HomeContainer>
  );
};