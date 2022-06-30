import React from 'react';
import { Wrapper } from './style';
import fish from '../../img/Peces.png';
import bubbles from '../../img/Burbujas.png';
import letters from '../../img/Letras.png';

export const Page404: React.FC = () => {
  return (
    <Wrapper>
      <img className="fish" src={fish} alt="fish" />
      <img className="bubbles" src={bubbles} alt="bubbles" />
      <img className="letters" src={letters} alt="letters" />
    </Wrapper>
  );
};
