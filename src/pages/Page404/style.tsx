import styled from 'styled-components';
import background from '../../img/Fondo.png';

export const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  & .fish {
    position: relative;
    height: auto;
    width: 200px;
    top: 200px;
    left: 100px;
  }

  & .bubbles {
    position: relative;
    height: auto;
    width: 400px;
    top: 600px;
    left: calc(100vw - 700px);
  }

  & .letters {
    position: relative;
    height: auto;
    width: 300px;
    top: 400px;
  }
`;
