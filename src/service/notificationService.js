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
export {
    notifications,
}