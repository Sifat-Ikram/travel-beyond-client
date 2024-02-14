import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: "https://travel-beyond-server.vercel.app"
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log("interceptor used here", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use( response => {
        return response;
      }, async error => {
        const status = error.response.status;
        if (status === 401 || status === 203) {
            await logOut();
            navigate("/signIn");
        }
        return Promise.reject(error);
      });

    return axiosSecure;
};

export default useAxiosSecure;