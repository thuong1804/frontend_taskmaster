import { deleteCookie } from "cookies-next";

import axios from "axios";
import urlPath from "../constant/path";

const login = async(email, password) => {
  return await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_WEB_URL + urlPath.login,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {
            email,
            password,
        },
        withCredentials: true,
    })
}

const logout = async() => {
   return await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_WEB_URL + urlPath.logout,
    }).then((res) => {deleteCookie('login'), deleteCookie('refreshToken')})
}
export {
    login,
    logout
}