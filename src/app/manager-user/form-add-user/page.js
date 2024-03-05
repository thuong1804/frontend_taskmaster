'use client'
import { UserAddOutlined } from "@ant-design/icons";
import FormUser from "./form-user";
import styles from './page.module.scss'
const FormUserPage = () => {
    return (
        <div className={styles.container}>
            <h1>
                <UserAddOutlined /> Add new user!
            </h1>
            <div style={{ width: '700px' }}>
                <FormUser />
            </div>
        </div>
    )
}
export default FormUserPage;