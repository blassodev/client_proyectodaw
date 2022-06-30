import axios from 'axios';

export const requestInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const requestNoTokenInstance = axios.create({
  baseURL: 'http://localhost:4000/',
});
