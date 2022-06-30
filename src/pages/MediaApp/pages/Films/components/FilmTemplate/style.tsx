import styled from 'styled-components';

interface FilmCardProps {
  image: string;
}

export const FilmImage = styled.div<FilmCardProps>`
  width: 200px;
  height: 300px;
  background-image: url('${p => p.image}');
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
