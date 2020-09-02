import Axios from 'axios';

const TOKEN_KEY = 'SIGESPRED_TOKEN';
const BASE_URL = 'http://localhost:8000/api';
export const serverFile='http://localhost:7000/files/';


export function filepath(file) {
    return serverFile+file;
}

const clienteAxios = () => {
    return Axios.create({
        baseURL: BASE_URL
    });

}

export function initAxiosInterceptors() {

    const axios = clienteAxios();

    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.authorization = `bearer ${token}`;
        }
        return config;
    });

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            console.log(error);
            if (error.response.status === 401) {
                deleteToken();
                window.location = '/login';
            } else {
                return Promise.reject(error);
            }
        }
    );

    return axios;
}

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const logout = () => {
    deleteToken();
}


