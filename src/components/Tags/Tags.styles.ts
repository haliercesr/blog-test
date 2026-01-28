import styled from 'styled-components';

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tag = styled.button<{ $size?: 'sm' | 'md'; $active?: boolean }>`
  padding: ${({ theme, $size }) => ($size === 'sm' ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.sm} ${theme.spacing.md}`)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.backgroundAlt)};
  color: ${({ theme, $active }) => ($active ? 'white' : theme.colors.textLight)};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme, $size }) => ($size === 'sm' ? theme.fontSizes.xs : theme.fontSizes.sm)};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.primaryDark : theme.colors.border)};
    color: ${({ theme, $active }) => ($active ? 'white' : theme.colors.text)};
  }
`;

export const ClearFilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;