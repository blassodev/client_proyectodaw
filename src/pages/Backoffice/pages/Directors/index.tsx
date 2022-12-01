import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableSelectionChangeParams,
} from 'primereact/datatable';
import { DirectorModel } from '../../../../models/DirectorModel';
import {
  createDirector,
  deleteDirector,
  deleteDirectors,
  getDirectors,
} from '../../../../requests/directors';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { CustomFormField } from '../Movies/style';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import Actions from '../../enums/actions.enum';

const Directors: FC = () => {
  const [directors, setDirectors] = useState<DirectorModel[]>([]);
  const [directorForm, setDirectorForm] = useState({
    action: Actions.NEW,
    name: '',
    surnames: '',
    bio: '',
    age: 0,
  });

  const [selectedDirectors, setSelectedDirectors] = useState<DirectorModel[]>(
    []
  );
  const [visibleDialog, setVisibleDialog] = useState(false);

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = () => {
    getDirectors().then(setDirectors);
  };

  const handleDialogHide = () => {
    setVisibleDialog(false);
  };

  const handleSelectetionChange = (data: DataTableSelectionChangeParams) => {
    const value = data.value as DirectorModel[];
    setSelectedDirectors(value);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setDirectorForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleYearChange = (e: InputNumberChangeParams) => {
    setDirectorForm(prevState => ({
      ...prevState,
      age: e.value ?? 0,
    }));
  };

  const handleNewCreate = async () => {
    await createDirector({
      name: directorForm.name,
      bio: directorForm.bio,
      age: directorForm.age,
      surnames: directorForm.surnames,
    });

    fetchDirectors();
    setVisibleDialog(false);
  };

  const cloneDirector = async (director: DirectorModel) => {
    await createDirector(director.toInterface());
    fetchDirectors();
  };

  const handleTrashClick = async (id: number) => {
    await deleteDirector(id);
    fetchDirectors();
  };

  const handleBatchTrashClick = async () => {
    await deleteDirectors(selectedDirectors.map(d => d.id));
    fetchDirectors();
  };

  const actionBodyTemplate = (rowData: DirectorModel) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-clone"
          className="p-button-rounded mr-2"
          onClick={() => cloneDirector(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => handleTrashClick(rowData.id)}
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
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={handleNewCreate}
      />
    </React.Fragment>
  );

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
          onClick={handleBatchTrashClick}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-3">
      <Toolbar left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={directors}
        selectionMode="checkbox"
        selection={selectedDirectors}
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
        <Column field="age" header="Edad"></Column>
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
            <InputText
              name="name"
              value={directorForm.name}
              onChange={handleChange}
            />
          </CustomFormField>
          <CustomFormField>
            <label htmlFor="name">Apellidos</label>
            <InputText
              name="surnames"
              value={directorForm.surnames}
              onChange={handleChange}
            />
          </CustomFormField>
        </div>
        <CustomFormField>
          <label htmlFor="name">Bio</label>
          <InputTextarea
            name="bio"
            value={directorForm.bio}
            onChange={handleChange}
          />
        </CustomFormField>
        <CustomFormField>
          <label htmlFor="age">Edad</label>
          <InputNumber
            name="age"
            value={directorForm.age}
            onChange={handleYearChange}
            max={2999}
          />
        </CustomFormField>
      </Dialog>
    </div>
  );
};

export default Directors;
