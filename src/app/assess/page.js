'use client'


import FormAssess from "./FormAssess";
import styles from './page.module.scss'

const AssessPage = () => {
    return (
        <div className={styles.container}>
            <h1>Asssess Infomation</h1>
                <FormAssess />
        </div>
    )
}
export default AssessPage;