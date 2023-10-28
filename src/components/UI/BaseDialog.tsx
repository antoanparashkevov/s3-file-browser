import { Fragment, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import styles from './BaseDialog.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Backdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
`;

const ModalOverlay = (
    {children}:
        {children: ReactNode}
) => {
    
    return (
        <dialog open className={cx("dialog")}>
            <header className={cx("dialog_header")}>
                <h1>Enter your S3 Credentials</h1>
            </header>
            <section className={cx("dialog_section")}>
                {children}
            </section>
        </dialog>
    )
}

const BaseDialog = (
    {children}:
        {children: ReactNode}
) => {
    return (
        <Fragment>
            {createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root') as HTMLDivElement)
            }
            {createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                document.getElementById('overlay-root') as HTMLDialogElement)
            }
        </Fragment>
    ) 
}

export default BaseDialog;