import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useParams, usePathname, useRouter } from 'next/navigation'
import urlPath from "@/constant/path";

import styles from './FooterLayout.module.scss'

const FooterLayout = () => {
    const pathname = usePathname()
    const router = useRouter()
    const params = useParams()
    const { id } = params;
    const mappingURL = Object.values(urlPath).find(item => {
        if (item.split('/').length > 2) {
            return pathname.includes(item)
        }
    })

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
export default FooterLayout;