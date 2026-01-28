import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Users } from '../pages/Users';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { Header, Loader, Modal } from '../components';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Loader />
      <Modal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
