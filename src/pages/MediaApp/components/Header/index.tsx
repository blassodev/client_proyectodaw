import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { useAuth } from '../../../../hooks/useAuth';

export const Header: React.FC = () => {
  const auth = useAuth();
  const items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-power-off',
          command() {
            auth.signout(() => {});
          },
        },
      ],
    },
  ];
  return (
    <Menubar
      model={items}
      end={<InputText placeholder="Search" type="text" />}
    />
  );
};
