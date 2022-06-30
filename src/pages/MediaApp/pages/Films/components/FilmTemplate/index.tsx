import React from 'react';
import { FilmModel } from 'models/FilmModel';
import { FilmImage, Wrapper } from './style';

export const FilmTemplate: React.FC<FilmModel> = film => {
  return (
    <Wrapper>
      <FilmImage image={film.movie.imageUrl} />
      <p>{film.movie.name}</p>
    </Wrapper>
  );
};
