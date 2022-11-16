import axios, { AxiosRequestConfig } from 'axios';

const basicConf: AxiosRequestConfig = {
  baseURL: 'https://daw.blasserver.com/',
  validateStatus: status => status >= 200 && status < 300,
};

export const requestInstance = axios.create({
  ...basicConf,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const requestNoTokenInstance = axios.create(basicConf);
