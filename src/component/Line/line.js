import classNames from 'classnames';
import styles from './line.module.scss'

const LineRender = ({
    text, 
    size,
}) => {
    const sizeRender = {
        large: styles.larger,
        middle: styles.middle,
        small: styles.small,
    };

    const lineClasses = classNames(
        styles.line,
        sizeRender[size] 
    );

    return (
        <div className={lineClasses}>
            <h2>{text}</h2>
        </div>
    )
}
export default LineRender;