import Axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const axios = Axios.create({
  baseURL: BASE_URL,
});