import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-b4cba-default-rtdb.firebaseio.com/'
});

export default axiosInstance;