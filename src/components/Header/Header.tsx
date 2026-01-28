import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { LogOut } from 'lucide-react';
import { useAuthContext } from '../../context';
import { jwtDecode } from '../../utils/jwtDecode';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  UserSection,
  UserAvatar,
  UserName,
  LogoutButton,
} from './Header.styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, login, logout } = useAuthContext();

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const decoded = jwtDecode(response.credential);
      login({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        googleId: decoded.sub,
      });
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => navigate('/')}>BlogApp</Logo>

        <Nav>
          <NavLink onClick={() => navigate('/')} $active={location.pathname === '/'}>
            Posts
          </NavLink>
          {isAuthenticated && (
            <NavLink onClick={() => navigate('/users')} $active={location.pathname === '/users'}>
              Usuarios
            </NavLink>
          )}
        </Nav>

        <UserSection>
          {isAuthenticated && user ? (
            <>
              <UserAvatar src={user.picture} alt={user.name} />
              <UserName>{user.name}</UserName>
              <LogoutButton onClick={logout}>
                <LogOut size={18} />
              </LogoutButton>
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              size="medium"
              theme="outline"
              text="signin"
              shape="pill"
            />
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
