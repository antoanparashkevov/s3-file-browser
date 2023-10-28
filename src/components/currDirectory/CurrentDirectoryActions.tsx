import styles from "./CurrentDirectoryActions.module.scss";
import React from "react";
import { Button } from "../UI/BaseButton";

const CurrentDirectoryActions = () => {
    
    return (
        <div className={styles['current_directory_actions']}>
            <div className={styles['current_directory_actions_navigate']}>
               <img src="/icons/arrow.svg" alt="Prev Icon" width={24} height={24}/>
               <img src="/icons/arrow.svg" alt="Next Icon" width={24} height={24}/>
            </div>
            <div className={styles['current_directory_actions_create_delete']}>
                <Button $primary $small>Create</Button>
            </div>
        </div>
    )
};

export default CurrentDirectoryActions;