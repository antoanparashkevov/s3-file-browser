import React from "react";
import styles from "./CurrentDirectoryActions.module.scss";
import classNames from "classnames/bind";

//UI components
import { Button } from "../UI/BaseButtons";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const cx = classNames.bind(styles);

const CurrentDirectoryActions = ({client, encodedcredentials}: {client: any, encodedcredentials: any}) => {
    
    const handleClick = async () => {
        try {
            await client.send(
                new PutObjectCommand({
                    Bucket: encodedcredentials.bucketName,
                    Key: 'prefix/subprefix/object.txt',
                    Body: "Hello, this is the content of the new object!"
                })
            )
        } catch (err) {
            console.error('error uploading object: ', err)
        }
    }
    
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
                <Button $small onClick={handleClick}>Create</Button>
            </div>
        </div>
    )
};

export default CurrentDirectoryActions;