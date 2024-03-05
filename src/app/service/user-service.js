import axios from "../setup/axios";

const handelGetListUser = async(data) => {
   return await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/users`,
        data: {
            ...data
        }
    })
}

const handelCreateUser = async(email, name, address, gender, groupId) => {
    return await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/create-user`,
        data: {
           email,
           name,
           address,
           gender,
           groupId
        }
    })
}

const handelDeleteUser = async(id) => {
    return await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/delete-user`,
        data: {
           id,
        }
    })
}

const handelUpdateUser = async(email, name, address, gender, groupId) => {
    return await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/update-user`,
        data: {
           email,
           name,
           address,
           gender,
           groupId,
        }
    })
}

export {
    handelCreateUser,
    handelGetListUser,
    handelUpdateUser,
    handelDeleteUser,
}