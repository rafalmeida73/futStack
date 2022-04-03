import axios from 'axios';

export const apiBd = axios.create({
  baseURL: 'https://fut-stack.vercel.app/api',
});
