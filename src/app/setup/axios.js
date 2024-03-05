import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEB_URL,
  });

export default instance;