import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fut-stack.vercel.app/api',
});
