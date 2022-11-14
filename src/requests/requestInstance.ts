import axios from 'axios';

export const requestInstance = axios.create({
  baseURL: 'https://daw.blasserver.com/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const requestNoTokenInstance = axios.create({
  baseURL: 'https://daw.blasserver.com/',
});
