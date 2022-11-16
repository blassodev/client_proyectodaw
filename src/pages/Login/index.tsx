import {
  CustomFormField,
  CustomLabel,
  ForgottenPasswordContainer,
  LoginBox,
  Wrapper,
} from './style';
import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../requests/login';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import logo from 'img/mediapp.png';
import { AxiosError } from 'axios';
import { classNames } from 'primereact/utils';
import { IBackendError } from '../../interfaces/backendError';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    user: '',
    password: '',
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFormSubmit = async () => {
    postLogin(loginData.user, loginData.password)
      .then(user => {
        setLoginError(null);
        if (user.isAdmin) {
          auth.signin(user, () => {
            navigate('/backoffice');
          });
        } else {
          auth.signin(user, () => {
            navigate('/mediapp/films');
          });
        }
      })
      .catch((e: AxiosError<IBackendError>) => {
        setLoginError(e.response?.data.error || null);
      });
  };

  return (
    <Wrapper>
      <Card>
        <LoginBox>
          <img src={logo} alt="" width={300} />
          <CustomFormField>
            <CustomLabel htmlFor="user">User</CustomLabel>
            <InputText
              value={loginData.user}
              name="user"
              onChange={handleFormChange}
              className={classNames({
                'w-full': true,
                'p-invalid': loginError,
              })}
            />
          </CustomFormField>
          <CustomFormField className="mb-5">
            <CustomLabel htmlFor="user">Contraseña</CustomLabel>
            <InputText
              value={loginData.password}
              type="password"
              name="password"
              onChange={handleFormChange}
              className={classNames({
                'w-full': true,
                'p-invalid': loginError,
              })}
            />
          </CustomFormField>
          {loginError && <small className="p-error m-2">{loginError}</small>}
          <ForgottenPasswordContainer>
            <Link to="#">¿Has olvidado la contraseña?</Link>
          </ForgottenPasswordContainer>
          <Button
            label="Iniciar sesión"
            icon="pi pi-user"
            onClick={handleFormSubmit}
            className="w-full"
          />
        </LoginBox>
      </Card>
    </Wrapper>
  );
};

export default Login;
