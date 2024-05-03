import axios from "axios";
import { getCookies, setCookie } from "cookies-next";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEB_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = getCookies('login');
        if (token) {
            config.headers.Authorization = `Bearer ${token.login}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getCookies('refreshToken');
                const response = await axios({
                    method:'post',
                    url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/refreshToken`,
                    data: {
                        refreshToken: refreshToken.refreshToken
                    },
                    withCredentials: true,
                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                });
                const token = response.data.accessToken;
                setCookie('login', token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return await axios(originalRequest);
            } catch (error) {
                console.log({error})
                deleteCookie('login')
                
            }
        }
        return Promise.reject(error);
    }
);
export default instance;