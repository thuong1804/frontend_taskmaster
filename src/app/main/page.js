'use client'

import { Button } from "antd";
import Image from 'next/image'
import styles from './main.module.scss'
import { useRouter } from "next/navigation";
import urlPath from "../constant/path";

const MainPage = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.leftContent}>
                    <h1>Todo-List!</h1>
                    <div className={styles.btnAuth}>
                        <Button type="primary"  onClick={() => router.push(urlPath.login)}>Sign In </Button>
                        <Button onClick={() => router.push(urlPath.register)}>Register</Button>
                    </div>
                </div>
                <Image src={'/background.png'} width={600} height={600} alt="background" />
            </div>
        </div>
    )
}
export default MainPage;