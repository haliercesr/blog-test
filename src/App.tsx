import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, PostsProvider, UIProvider } from './context';
import { theme, GlobalStyles } from './theme';
import { AppRouter } from './router';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <UIProvider>
            <PostsProvider>
              <AppRouter />
            </PostsProvider>
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
