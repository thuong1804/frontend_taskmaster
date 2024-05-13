import Register from "./register";
import styles from './register.module.scss'
const Page = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formSignUp}>
                <h1>Register</h1>
                <Register />
            </div>
        </div>
    )
}
export default Page;