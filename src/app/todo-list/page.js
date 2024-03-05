import { UnorderedListOutlined } from "@ant-design/icons";
import ListTable from "./list-table";
import styles from './page.module.scss'
const TodoList = () => {
    return (
    <div className={styles.container}>
        <h1><UnorderedListOutlined /> List Task Manager</h1>
        <ListTable />
    </div>)
}
export default TodoList;