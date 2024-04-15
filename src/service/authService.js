import { deleteCookie } from "cookies-next";

import axios from "axios";
import urlPath from "../constant/path";

const login = async (email, password) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/login`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            email,
            password,
        },
        withCredentials: true,
    })
}

const register = async ({ email, name, password, confirmPassword }) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/register`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            email,
            name,
            password,
            confirmPassword,
        },
        withCredentials: true,
    })
}

const logout = async () => {
    return await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_WEB_URL + urlPath.logout,
    }).then((res) => { deleteCookie('login'), deleteCookie('refreshToken') })
}

const sendEmailCode = async ({email}) => {
    return await axios({
        method: 'post',
        data: {
            email,
        },
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/sendEmail`,
    })
}

const verifyCode = async ({code, emailUSer}) => {
    return await axios({
        method: 'post',
        data: {
            code,
            emailUSer,
        },
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true,
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/recover-code`,
    })
}

const changePasswordForgot = async ({email, password, confirmPassword}) => {
    return await axios({
        method: 'post',
        data: {
            email,
            password,
            confirmPassword,
        },
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true,
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/change-password-forgot`,
    })
}

const changePassword = async ({email, password, newPassword}) => {
    return await axios({
        method: 'post',
        data: {
            email,
            password,
            newPassword,
        },
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true,
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/change-password`,
    })
}
export {
    login,
    logout,
    register,
    sendEmailCode,
    verifyCode,
    changePassword,
    changePasswordForgot,
}