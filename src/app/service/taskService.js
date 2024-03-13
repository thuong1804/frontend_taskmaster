import axios from "../setup/axios";

const getTask = async () => {
  return await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/tasks`,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
    })
}

const createTask = async () => {
    return await axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_WEB_URL}/api/create-task`,
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          withCredentials: true,
      })
  }

export {
    getTask,
    createTask,
}