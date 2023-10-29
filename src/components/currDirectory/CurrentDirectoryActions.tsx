import React from "react";
import styles from "./CurrentDirectoryActions.module.scss";
import classNames from "classnames/bind";

//UI components
import { Button } from "../UI/BaseButtons";

const cx = classNames.bind(styles);

const CurrentDirectoryActions:React.FC = () => {
    
    const createFolder = () => {
        console.log('create folder');
    }
    
    const createFile = () => {
        console.log('create file');
    }
    
    
    return (
        <div className={styles['current_directory_actions']}>
            <div className={styles['current_directory_actions_navigate']}>
               <div className={cx("arrow_wrapper", "arrow_prev")}>
                   <img src="/icons/arrow.svg" alt="Prev Icon" width={24} height={24}/>
               </div>
                <div className={cx("arrow_wrapper", "arrow_next")}>
                    <img src="/icons/arrow.svg" alt="Next Icon" width={24} height={24}/>
                </div>
            </div>
            <div className={styles['current_directory_actions_buttons']}>
                <Button $small onClick={createFolder}>Create Folder</Button>
                <Button $small onClick={createFile}>Create File</Button>
            </div>
        </div>
    )
};

export default CurrentDirectoryActions;