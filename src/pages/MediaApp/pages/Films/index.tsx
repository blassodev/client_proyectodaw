import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { FilmTemplate } from './components/FilmTemplate';
import { FilmModel } from '../../../../models/FilmModel';
import { getFilms } from '../../../../requests/film';

export const Films: React.FC = () => {
  const [films, setFilms] = useState<FilmModel[]>([]);

  useEffect(() => {
    getFilms().then(setFilms);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div>
      <Carousel
        value={films}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={FilmTemplate}
      />
    </div>
  );
};
