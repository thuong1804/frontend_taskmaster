import { handelGetByIdUser } from "@/app/service/user-service";
import { getCookies } from "cookies-next";
import jwt from 'jsonwebtoken';

const { useState, useEffect } = require("react")

const useUser = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const cookies = getCookies('login')
            if (cookies && cookies.login) {
                await handelGetProfileUser().then((res) => setData(res.data.data.content))
            }
        }
        fetchData();
    }, [])

    return {
        data
    }

}
export {
    useUser,
}