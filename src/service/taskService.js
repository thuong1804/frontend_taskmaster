import axios from "../setup/axios";

const getTask = async ({userId, groupId, page, size, taskTitle, reporter}) => {
    return await axios({
        method: 'post',
        // url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/tasks?page=${page}&size=${5}`,
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/tasks`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true,
        data: {
            userId: userId,
            groupId: groupId,
            page: page,
            size: 5,
            taskTitle: taskTitle,
            reporter: reporter,
        }
    })
}

const createTask = async ({ 
    userId, 
    taskTitle, 
    taskDescription, 
    scheduledDate, 
    completedDate, 
    reporter,
    owner,
    status
}) => {
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
            owner,
            status,
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

const updateTask = async ({
    id, 
    userId, 
    taskTitle, 
    taskDescription, 
    scheduledDate, 
    completedDate, 
    reporter,
    owner,
}) => {
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
            owner,
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

const searchTask = async ({taskTitle}) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/search?taskTitle=${taskTitle}`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            taskTitle: taskTitle,
        },
        withCredentials: true,
    })
}


const updateStatus = async ({id, status}) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/status`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            id: id,
            status: status,
        },
        withCredentials: true,
    })
}

const checkDeadline = async ({id, userId}) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/deadline`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: {
            id: id,
            userId: userId,
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
    searchTask,
    updateStatus,
    checkDeadline,
}