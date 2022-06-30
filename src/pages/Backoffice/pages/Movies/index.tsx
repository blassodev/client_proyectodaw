import React, { ChangeEventHandler, useEffect, useState } from 'react';
import {
  DataTable,
  DataTableSelectionChangeParams,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  createFilm,
  deleteFilm,
  deleteFilms,
  getAllFilms,
  updateFilm,
} from '../../../../requests/film';
import { Rating, RatingChangeParams } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CustomFormField } from './style';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber';
import { getDirectors } from '../../../../requests/directors';
import { DirectorModel } from '../../../../models/DirectorModel';
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Toolbar } from 'primereact/toolbar';

interface DataTableFilm {
  id: number;
  name: string;
  year: number;
  director: number;
  imageUrl: string;
  score: number;
}
export enum ACTIONS {
  // eslint-disable-next-line no-unused-vars
  EDIT,
  // eslint-disable-next-line no-unused-vars
  NEW,
}

export const Movies: React.FC = () => {
  const [films, setFilms] = useState<DataTableFilm[]>([]);
  const [directors, setDirectors] = useState<DirectorModel[]>([]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    action: ACTIONS.NEW,
    id: 0,
    name: '',
    imageUrl: '',
    year: 0,
    score: 0,
    director: new DirectorModel({
      id: 2,
      name: 'No Director',
      surnames: '',
      bio: '',
      age: 0,
    }),
  });
  const [selectedMovies, setSelectedMovies] = useState<DataTableFilm[] | null>(
    null
  );

  useEffect(() => {
    fetchFilms();
    getDirectors().then(setDirectors);
  }, []);

  const fetchFilms = () => {
    getAllFilms().then(fetchedFilms => {
      const proccesedFilms: DataTableFilm[] = fetchedFilms.map(film => {
        return {
          id: film.id,
          name: film.name,
          year: film.year,
          director: film.director.id,
          imageUrl: film.imageUrl,
          score: film.score,
        };
      });

      setFilms(proccesedFilms);
    });
  };

  const handleDeleteFilm = (rowData: DataTableFilm) => {
    deleteFilm(rowData.id).then(() => {
      fetchFilms();
    });
  };

  const handleSelectetionChange = (data: DataTableSelectionChangeParams) => {
    const value = data.value as DataTableFilm[];
    setSelectedMovies(value);
  };

  const imageBodyTemplate = (rowData: DataTableFilm) => {
    return <img src={rowData.imageUrl} alt="" className="tableImage" />;
  };
  const ratingBodyTemplate = (rowData: DataTableFilm) => {
    return <Rating value={rowData.score} readOnly cancel={false} />;
  };
  const directorBodyTemplate = (rowData: DataTableFilm) => {
    const director = directors.find(
      fdirector => fdirector.id === rowData.director
    );
    return director?.fullName;
  };

  const actionBodyTemplate = (rowData: DataTableFilm) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-clone"
          className="p-button-rounded mr-2"
          onClick={() => handleCloneAction(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => handleEditAction(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => handleDeleteFilm(rowData)}
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
        onClick={() =>
          editForm.action === ACTIONS.EDIT
            ? handleEditSave()
            : handleNewCreate()
        }
      />
    </React.Fragment>
  );

  const handleEditAction = (rowData: DataTableFilm) => {
    const director = directors.find(
      fdirector => fdirector.id === rowData.director
    );
    setEditForm(prevState => ({
      ...prevState,
      action: ACTIONS.EDIT,
      id: rowData.id,
      name: rowData.name,
      imageUrl: rowData.imageUrl,
      year: rowData.year,
      score: rowData.score,
      director: director ?? editForm.director,
    }));
    setVisibleDialog(true);
  };

  const handleCloneAction = async (rowData: DataTableFilm) => {
    const director = directors.find(
      fdirector => fdirector.id === rowData.director
    );

    await createFilm({
      name: rowData.name,
      year: rowData.year,
      score: rowData.score,
      directorId: director ? director.id : 2,
      imageUrl: rowData.imageUrl,
    });

    fetchFilms();
  };

  const handleEditSave = () => {
    updateFilm(editForm.id, {
      name: editForm.name,
      year: editForm.year,
      score: editForm.score,
      imageUrl: editForm.imageUrl,
      directorId: editForm.director.id,
    }).then(() => {
      fetchFilms();
      handleDialogHide();
    });
  };

  const handleNewClick = () => {
    setEditForm({
      action: ACTIONS.NEW,
      id: 0,
      name: '',
      imageUrl: '',
      year: 0,
      score: 0,
      director: new DirectorModel({
        id: 2,
        name: 'No Director',
        surnames: '',
        bio: '',
        age: 0,
      }),
    });

    setVisibleDialog(true);
  };

  const handleNewCreate = async () => {
    await createFilm({
      name: editForm.name,
      imageUrl: editForm.imageUrl,
      year: editForm.year,
      score: editForm.score,
      directorId: editForm.director.id,
    });

    fetchFilms();
    setVisibleDialog(false);
  };

  const handleBatchDeleteFilms = async () => {
    const ids = selectedMovies?.map(movie => movie.id);
    if (ids) await deleteFilms(ids);
    fetchFilms();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setEditForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleYearChange = (e: InputNumberChangeParams) => {
    setEditForm(prevState => ({
      ...prevState,
      year: e.value ?? 0,
    }));
  };

  const handleRatingChange = (e: RatingChangeParams) => {
    setEditForm(prevState => ({
      ...prevState,
      score: e.value ?? 0,
    }));
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Crear"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={() => handleNewClick()}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => handleBatchDeleteFilms()}
        />
      </React.Fragment>
    );
  };

  const handleDialogHide = () => {
    setVisibleDialog(false);
  };

  const directorSearch = async (event: AutoCompleteCompleteMethodParams) => {
    const { query } = event;

    const directors = await getDirectors();

    const filtered = directors.filter(director =>
      director.fullName.toLowerCase().includes(query)
    );

    setDirectors(filtered ?? []);
  };

  return (
    <div className="p-3">
      <Toolbar left={leftToolbarTemplate} />
      <DataTable
        value={films}
        selectionMode="checkbox"
        selection={selectedMovies}
        className="p-card shadow-2"
        responsiveLayout="scroll"
        onSelectionChange={handleSelectetionChange}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3em' }}
        ></Column>
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="year" header="Año"></Column>
        <Column body={directorBodyTemplate} header="Director"></Column>
        <Column body={ratingBodyTemplate} header="Puntuación"></Column>
        <Column body={imageBodyTemplate} header="Imagen"></Column>
        <Column body={actionBodyTemplate} header="Acciones"></Column>
      </DataTable>

      <Dialog
        style={{ width: 1000 }}
        visible={visibleDialog}
        onHide={handleDialogHide}
        footer={editDialogFooter}
      >
        <div className="flex justify-content-center">
          <img height={300} src={editForm.imageUrl} alt="" />
        </div>
        <CustomFormField>
          <label htmlFor="imageUrl">URL de imagen</label>
          <InputText
            onChange={handleChange}
            value={editForm.imageUrl}
            name="imageUrl"
          />
        </CustomFormField>
        <div className="flex justify-content-between">
          <CustomFormField>
            <label htmlFor="name">Nombre</label>
            <InputText
              onChange={handleChange}
              value={editForm.name}
              name="name"
            />
          </CustomFormField>
          <CustomFormField>
            <label htmlFor="year">Año</label>
            <InputNumber
              onChange={handleYearChange}
              value={editForm.year === 0 ? null : editForm.year}
              name="year"
              max={2999}
            />
          </CustomFormField>
        </div>
        <CustomFormField>
          <label htmlFor="score">Puntuación</label>
          <Rating
            value={editForm.score}
            cancel={false}
            onChange={handleRatingChange}
            name="score"
          />
        </CustomFormField>
        <CustomFormField>
          <label htmlFor="director">Director</label>
          <AutoComplete
            name="director"
            value={editForm.director}
            suggestions={directors}
            dropdown
            completeMethod={directorSearch}
            onChange={({ value }) =>
              setEditForm({ ...editForm, director: value })
            }
            field="fullName"
          />
        </CustomFormField>
      </Dialog>
    </div>
  );
};
