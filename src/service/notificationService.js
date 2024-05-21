import axios from "../setup/axios";

const notifications = async (userId) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/notifications`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            userId: userId
        },
        withCredentials: true,
    })
}

const readOne = async(seen) => {
    return await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/read`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: seen,
        withCredentials: true,
    })
}

const readAll = async(userId) => {
    return await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/readAll`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: userId,
        withCredentials: true,
    })
}

export {
    notifications,
    readOne,
    readAll,
}