import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_HOSTNAME
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_HOSTNAME,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
}); 