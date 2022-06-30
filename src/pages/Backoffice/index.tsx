import React from 'react';
import { Outlet } from 'react-router-dom';

export const Backoffice: React.FC = () => {
  return (
    <div>
      <p>Header</p>
      <Outlet />
    </div>
  );
};
