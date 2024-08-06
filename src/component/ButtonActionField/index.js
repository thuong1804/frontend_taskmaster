import { CheckOutlined, CloseOutlined} from "@ant-design/icons";
import { Button } from "antd";
import { useParams, usePathname, useRouter } from 'next/navigation'
import urlPath from "@/constant/path";
import styles from './index.module.scss'
import { useEffect } from "react";

const ButtonActionContainer = () => {
    const pathname = usePathname()
    const router = useRouter()
    const params = useParams()
    const {id} = params;
    const mappingURL = Object.values(urlPath).find(item => pathname.includes(item))

    return (
        <div className={styles.btnAction}>
            <Button onClick={() => router.back()}>
                <CloseOutlined /> Cancel
            </Button>
            <Button type="primary" htmlType="submit" form={id ? mappingURL : pathname}>
                <CheckOutlined /> Submit
            </Button>
    </div>
    )
}
export default ButtonActionContainer;