import React, { FC, useEffect, useState } from 'react';
import { getUsers } from '../../../../requests/users';
import { Toolbar } from 'primereact/toolbar';
import {
  DataTable,
  DataTableSelectionChangeParams,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { UserModel } from '../../../../models/UserModel';
import { Dialog } from 'primereact/dialog';
import { CustomFormField } from '../Movies/style';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';

const Users: FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserModel[]>([]);
  const [visibleDialog, setVisibleDialog] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSelectetionChange = (data: DataTableSelectionChangeParams) => {
    const value = data.value as UserModel[];
    setSelectedUsers(value);
  };

  const handleDialogHide = () => {
    setVisibleDialog(false);
  };

  const actionBodyTemplate = (rowData: UserModel) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-clone" className="p-button-rounded mr-2" />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
        />
      </React.Fragment>
    );
  };

  const adminBodyTemplate = (rowData: UserModel) => {
    return <Checkbox checked={rowData.isAdmin}></Checkbox>;
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Crear"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={() => setVisibleDialog(true)}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
        />
      </React.Fragment>
    );
  };

  const editDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => handleDialogHide()}
      />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" />
    </React.Fragment>
  );

  return (
    <div className="p-3">
      <Toolbar left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={users}
        selectionMode="checkbox"
        selection={selectedUsers}
        className="p-card shadow-2"
        responsiveLayout="scroll"
        onSelectionChange={handleSelectetionChange}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3em' }}
        ></Column>
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="surnames" header="Apellidos"></Column>
        <Column body={adminBodyTemplate} header="Admin"></Column>
        <Column body={actionBodyTemplate} header="Acciones"></Column>
      </DataTable>
      <Dialog
        style={{ width: 1000 }}
        visible={visibleDialog}
        onHide={handleDialogHide}
        footer={editDialogFooter}
      >
        <div className="flex justify-content-between">
          <CustomFormField>
            <label htmlFor="name">Nombre</label>
            <InputText name="name" />
          </CustomFormField>
          <CustomFormField>
            <label htmlFor="year">Año</label>
            <InputNumber name="year" max={2999} />
          </CustomFormField>
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
