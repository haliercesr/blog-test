import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.heading};
  margin-bottom: ${theme.spacing.md};
`;

const Text = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing.xl};
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: white;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404</Title>
      <Text>La página que buscas no existe</Text>
      <Button onClick={() => navigate('/')}>Volver al inicio</Button>
    </Container>
  );
};

export default NotFound;
