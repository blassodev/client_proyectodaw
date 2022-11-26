import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MediaApp from './pages/MediaApp';
import { AuthProvider } from './context/Auth';
import RequireAuth from './routes/RequireAuth';
import { Backoffice } from './pages/Backoffice';
import { Films } from './pages/MediaApp/pages/Films';
import { Page404 } from './pages/Page404';
import { Movies } from './pages/Backoffice/pages/Movies';
import Directors from './pages/Backoffice/pages/Directors';
import Users from './pages/Backoffice/pages/Users';

const Router: FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route
        path="mediapp"
        element={
          <RequireAuth>
            <MediaApp />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="films" />} />
        <Route path="films" element={<Films />} />
      </Route>
      <Route
        path="backoffice"
        element={
          <RequireAuth admin>
            <Backoffice />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="movies" />} />
        <Route path="movies" element={<Movies />} />
        <Route path="directors" element={<Directors />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  </AuthProvider>
);

export default Router;
