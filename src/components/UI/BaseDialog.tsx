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
    {children, title, status = 'success'}:
        {children: ReactNode, title?: string, status?: string}
) => {
    
    return (
        <dialog open className={cx("dialog")}>
            {title && 
                <header className={cx("dialog_header", status)}>
                    <h1>{title}</h1>
                </header>
            }
            <section className={cx("dialog_section")}>
                {children}
            </section>
        </dialog>
    )
}

const BaseDialog = (
    { children, title, onClose, status = 'success' }:
        { children?: ReactNode, title?: string, onClose?: (shouldClose: boolean) => void, status?: string }
) => {
    return (
        <Fragment>
            {createPortal(
                <Backdrop onClick={() => {
                    if(onClose) {
                        onClose(true)
                    }
                }} />,
                document.getElementById('backdrop-root') as HTMLDivElement)
            }
            {createPortal(
                <ModalOverlay title={title} status={status}>{children}</ModalOverlay>,
                document.getElementById('overlay-root') as HTMLDialogElement)
            }
        </Fragment>
    ) 
}

export default BaseDialog;