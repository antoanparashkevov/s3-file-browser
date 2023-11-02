import styles from "./CurrentDirectoryViewItem.module.scss";
import React, { Fragment, useState } from "react";
import { GetObjectCommand } from "@aws-sdk/client-s3";

//credentials
import { credentials, client } from "../../App";
import BaseDialog from "../UI/BaseDialog";

interface CurrentDirectoryViewItemInterface {
    name: string,
    isFolder: boolean,
    currentPrefix: string
}

const CurrentDirectoryViewItem: React.FC<CurrentDirectoryViewItemInterface> = (
    {name, isFolder, currentPrefix}
) => {
    const [fileContent, setFileContent] = useState<string>('')
    const [openFilePreview, setOpenFilePreview] = useState<boolean>(false);
    const handleDoubleClick = async (event: any) => {
        console.log('event >>> ', event)
        console.log('isFolder >>> ', isFolder)
        console.log('name >>> ', name)
        console.log('currentPrefix >>> ', currentPrefix)
        
        //when we click on a file
        if( !isFolder ) {
            try {
                if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                    
                    const params = {
                        Bucket: credentials.bucketName,
                        Key: currentPrefix + name
                    }
                    const command = new GetObjectCommand(params)
                    const response = await client.send(command)
                    
                    console.log('response from getting object data >>> ', response)
                    
                    const objectTextData = await response.Body.transformToString();
                    
                    if( objectTextData ) {
                        setOpenFilePreview(true)
                        setFileContent(objectTextData)
                    }
                    console.log('objectTextData from getting object data >>> ', objectTextData)
                    
                } else {
                    throw new Error("An error occurred while fetching objects");
                }
            } catch (error) {
                console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
            }
        }
    }
    
    const handleCloseTextPreview = (shouldClose:boolean) => {
        setOpenFilePreview(!shouldClose)
    }
    
    return (
        <Fragment>
            <div className={styles['current_directory_view_grid_item']} onDoubleClick={handleDoubleClick}>
                <img
                    src={isFolder ? '/icons/folder.svg' : '/icons/file.svg'}
                    alt="Folder"
                    width={80}
                    height={80}
                />
                {name}
            </div>
            {fileContent && openFilePreview &&
                <BaseDialog onClose={handleCloseTextPreview}>
                    {fileContent}
                </BaseDialog>
            }
        </Fragment>
    )
}

export default CurrentDirectoryViewItem;