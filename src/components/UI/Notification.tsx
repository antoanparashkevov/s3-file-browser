import { Fragment, ReactNode, useEffect, useState } from 'react';
import styles from './Notification.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Notification = (
    {children, status, delay = 5000}:
        {children: ReactNode, status: string, delay?: number}
) => {
    let [visible, setVisible] = useState(true)
    
    useEffect(() => {
        setVisible(true);
        const timeoutID = setTimeout(() => {
            setVisible(false)
        }, delay);
        
        return () => clearTimeout(timeoutID);
    }, [status]);
    
    return (
        <Fragment>
            {visible ? <span className={cx('notification', status)}>{children}</span> : null}
        </Fragment>
    )
}

export default Notification