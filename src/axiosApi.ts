import axios from 'axios';

const axiosApi = axios.create({
    baseURL: '//do-not-forget-to-change-url',
});

export default axiosApi;
