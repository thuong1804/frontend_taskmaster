import Register from "./register";
import styles from './register.module.scss'
const Page = () => {
    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <div className={styles.formSignUp}>
                <Register />
            </div>
        </div>
    )
}
export default Page;