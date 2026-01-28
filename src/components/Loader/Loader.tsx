import React from 'react';
import { useUIContext } from '../../context';
import { LoaderOverlay, SpinnerContainer, Spinner, LoaderText } from './Loader.styles';

export const Loader: React.FC = () => {
  const { isLoading, loadingMessage } = useUIContext();

  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <SpinnerContainer>
        <Spinner />
        <LoaderText>{loadingMessage}</LoaderText>
      </SpinnerContainer>
    </LoaderOverlay>
  );
};
