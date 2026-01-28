import styled from 'styled-components';

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const Tag = styled.button<{ $active?: boolean; $size?: 'sm' | 'md' }>`
  padding: ${({ theme, $size }) =>
    $size === 'sm'
      ? `${theme.spacing.xs} ${theme.spacing.sm}`
      : `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.textLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme, $size }) =>
    $size === 'sm' ? theme.fontSizes.xs : theme.fontSizes.sm};
  font-weight: 500;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primaryDark : theme.colors.border};
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryDark : theme.colors.secondary};
  }
`;

export const TagsSection = styled.aside`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const TagsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const ClearButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

export const TagsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
