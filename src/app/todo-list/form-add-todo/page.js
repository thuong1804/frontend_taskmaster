import FormAddTodo from "./formAddTodo"
import styles from './formAddTodo.module.scss';
const FormAddTodoPage = () => {
    return (
        <div className={styles.container}>
            <h1>Form add task</h1>
            <FormAddTodo />
        </div>
    )
}
export default FormAddTodoPage