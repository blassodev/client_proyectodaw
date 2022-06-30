import styled from 'styled-components';

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-weight: 500;
`;

export const CustomLabel = styled.label`
  margin-top: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const CustomFormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ForgottenPasswordContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  margin-bottom: 10px;
  & a {
    color: var(--blue-500);
    font-weight: 500;
    text-decoration: none;
  }
`;
