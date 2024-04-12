'use client'
import { UserAddOutlined } from "@ant-design/icons";
import FormUser from "./form-user";
import styles from './page.module.scss'
import { useParams } from 'next/navigation'
const FormUserPage = () => {
    const paramsId = useParams();
    return (
        <div className={styles.container}>
            <h1>
                <UserAddOutlined /> Edit user!
            </h1>
            <div style={{ width: '700px' }}>
                <FormUser paramsId={paramsId}/>
            </div>
        </div>
    )
}
export default FormUserPage;