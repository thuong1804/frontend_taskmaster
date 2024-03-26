import axios from "../setup/axios";

const getTask = async ({userId, groupId, page, size}) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/tasks?page=${page}&size=${5}`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true,
        data: {
            userId: userId,
            groupId: groupId,
            page: page,
            size: 5,
        }
    })
}

const createTask = async ({ userId, taskTitle, taskDescription, scheduledDate, completedDate, reporter }) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/create-task`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            userId,
            taskTitle,
            taskDescription,
            scheduledDate,
            completedDate,
            reporter,
        },
        withCredentials: true,
    })
}

const deleteTask = async (id) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/delete-task`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            id: id
        },
        withCredentials: true,
    })
}

const updateTask = async ({id, userId, taskTitle, taskDescription, scheduledDate, completedDate, reporter }) => {
    return await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/update-task`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            id,
            userId,
            taskTitle,
            taskDescription,
            scheduledDate,
            completedDate,
            reporter,
        },
        withCredentials: true,
    })
}


const getByIdTask = async (id) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/get-id-task/${id}`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            id: id,
        },
        withCredentials: true,
    })
}

export {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    getByIdTask,
}