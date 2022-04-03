import axios from 'axios';

export const apiBd = axios.create({
  baseURL: 'http://localhost:3000/api',
});
