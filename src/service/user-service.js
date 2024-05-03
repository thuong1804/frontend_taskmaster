import axios from "../setup/axios";

const handelGetListUser = async(data) => {
   return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/users`,
        data: {
            ...data
        },
        withCredentials: true,
        headers: {'X-Requested-With': 'XMLHttpRequest'},

    })
}

const handelCreateUser = async({email, name, address, gender, groupId, password}) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/create-user`,
        data: {
           email,
           name,
           address,
           gender,
           password,
           groupId
        }
    })
}

const handelDeleteUser = async(id) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/delete-user/${id}`,
        data: {
           id,
        }
    })
}

const handelUpdateUser = async({id, email, name, address, gender, groupId}) => {
    return await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/update-user`,
        data: {
            id,
           email,
           name,
           address,
           gender,
           groupId,
        }
    })
}

const handelGetByIdUser = async(id) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/get-id-user/${id}`,
        data: {
           id,
        }
    })
}

const handelGetProfileUser = async(data) => {
    return await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/profile`,
        data: {
           ...data,
        },
        withCredentials: true,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
}

export {
    handelCreateUser,
    handelGetListUser,
    handelUpdateUser,
    handelDeleteUser,
    handelGetByIdUser,
    handelGetProfileUser,
}