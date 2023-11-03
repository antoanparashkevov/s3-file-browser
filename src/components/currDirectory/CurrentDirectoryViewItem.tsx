import styles from "./CurrentDirectoryViewItem.module.scss";
import React, { Fragment, useState } from "react";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

//credentials
import { credentials, client } from "../../App";

//UI components
import BaseDialog from "../UI/BaseDialog";
import Dropdown, { dropdownItem } from "../UI/Dropdown";

const dropdownItems = [
    {
        name: "Delete",
        code: "delete"
    }
]

interface CurrentDirectoryViewItemInterface {
    name: string,
    isFolder: boolean,
    currentPrefix: string,
    onChangeFolder: (absolutePath: string) => void
}

const CurrentDirectoryViewItem: React.FC<CurrentDirectoryViewItemInterface> = (
    {name, isFolder, currentPrefix, onChangeFolder}
) => {
    const [fileContent, setFileContent] = useState<string>('')
    const [openFilePreview, setOpenFilePreview] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    
    const handleDoubleClick = async (event: any) => {
        
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
        //when we click on a folder
        else if( isFolder ) { 
            console.log('absolute path >>> ', currentPrefix + name)
            onChangeFolder(currentPrefix + name)
        }
    }
    
    const handleCloseTextPreview = (shouldClose:boolean) => {
        setOpenFilePreview(!shouldClose)
    }
    
    const handleRightClick = async (e:any) => {
        e.preventDefault()
        
        if(!isFolder) {
            setOpenDropdown(true)//TODO this should be handled with redux since we want to close the dropdown when we click wherever we want
        }
    }
    
    const handleSelectedItem = async (selectedItem: dropdownItem) => {
        console.log('selectedItem >>> ', selectedItem)
        
        switch (selectedItem.code) {
            case 'delete':
                await deleteItem()
            break;
        }
    }
    
    const deleteItem = async () => {
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const params = {
                    Bucket: credentials.bucketName,
                    Key: currentPrefix + name
                }
                const command = new DeleteObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from deleting an object >>> ', response)
                
            } else {
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    return (
        <Fragment>
            <div onContextMenu={handleRightClick} className={styles['current_directory_view_grid_item']} onDoubleClick={handleDoubleClick}>
                <img
                    src={isFolder ? '/icons/folder.svg' : '/icons/file.svg'}
                    alt="Folder"
                    width={80}
                    height={80}
                />
                <span>{name}</span>
                {openDropdown &&
                    <Dropdown dropdownItems={dropdownItems} onSelectedItem={handleSelectedItem} />
                }
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