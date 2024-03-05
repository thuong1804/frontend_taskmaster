import SignUp from "./signup";
import styles from './signup.module.scss'
const Page = () => {
    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <div className={styles.formSignUp}>
                <SignUp />
            </div>
        </div>
    )
}
export default Page;