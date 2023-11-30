import axios from 'axios';

const axiosConfig = {
  baseURL: 'https://copokopy4ka.fly.dev/',
};
const instance = axios.create(axiosConfig);
export default instance;
