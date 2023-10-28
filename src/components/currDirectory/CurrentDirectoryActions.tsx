import React from "react";
import styles from "./CurrentDirectoryActions.module.scss";
import classNames from "classnames/bind";

//UI components
import { Button } from "../UI/BaseButtons";

const cx = classNames.bind(styles);

const CurrentDirectoryActions = () => {
    
    return (
        <div className={styles['current_directory_actions']}>
            <div className={styles['current_directory_actions_navigate']}>
               <div className={cx({
                        "arrow_wrapper": true,
                        "arrow_prev": true,
                    })}
               >
                   <img src="/icons/arrow.svg" alt="Prev Icon" width={24} height={24}/>
               </div>
                <div className={cx({
                    "arrow_wrapper": true,
                    "arrow_next": true,
                })}
                >
                    <img src="/icons/arrow.svg" alt="Next Icon" width={24} height={24}/>
                </div>
            </div>
            <div className={styles['current_directory_actions_create_delete']}>
                <Button $small>Create</Button>
            </div>
        </div>
    )
};

export default CurrentDirectoryActions;