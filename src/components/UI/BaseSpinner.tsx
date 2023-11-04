import styles from './BaseSpinner.module.scss';

const BaseSpinner = () => {
    return (
        <div className={styles['spinner']}>
            <div className={styles['lds-roller']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default BaseSpinner;