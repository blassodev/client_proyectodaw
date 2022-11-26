import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useAuth } from '../../hooks/useAuth';

export const Backoffice: React.FC = () => {
  const auth = useAuth();

  const items: MenuItem[] = [
    {
      label: 'Peliculas',
      url: '/backoffice/movies',
      icon: 'pi pi-play',
    },
    {
      label: 'Directores',
      url: '/backoffice/directors',
      icon: 'pi pi-user',
    },
    {
      label: 'Usuarios',
      url: '/backoffice/users',
      icon: 'pi pi-user',
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-power-off',
      command() {
        auth.signout(() => {});
      },
    },
  ];
  return (
    <div>
      <Menubar model={items} />
      <Outlet />
    </div>
  );
};
