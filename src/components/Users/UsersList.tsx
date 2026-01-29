import React from 'react';
import { useUsers } from '../../hooks';
import {
  UsersContainer,
  UsersHeader,
  UsersTitle,
  UsersSubtitle,
  UsersGrid,
  UserCard,
  UserAvatar,
  UserName,
  UserEmail,
  UserTitle,
  LoadMoreButton,
} from './Users.styles';

export const UsersList: React.FC = () => {
  const { users, isLoading, hasMore, total, loadMore } = useUsers();

  return (
    <UsersContainer>
      <UsersHeader>
        <UsersTitle>Usuarios de la Plataforma</UsersTitle>
        <UsersSubtitle>
          {total > 0 ? `${total} usuarios registrados` : 'Cargando usuarios...'}
        </UsersSubtitle>
      </UsersHeader>

      <UsersGrid>
        {users.map((user, index) => (
          <UserCard key={user.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <UserAvatar src={user.picture} alt={`${user.firstName} ${user.lastName}`} />
            <UserName>
              {user.firstName} {user.lastName}
            </UserName>
            {user.email && <UserEmail>{user.email}</UserEmail>}
            <UserTitle>{user.title}</UserTitle> {/* Using 'title' which is mapped from 'gender' */}
          </UserCard>
        ))}
      </UsersGrid>

      {hasMore && (
        <LoadMoreButton onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Cargar más'}
        </LoadMoreButton>
      )}
    </UsersContainer>
  );
};