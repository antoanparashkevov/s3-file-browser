import styles from "./CurrentDirectoryViewItem.module.scss";
import React, { Fragment, useState } from "react";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

//UI components
import BaseDialog from "../UI/BaseDialog";
import Dropdown, { dropdownItem } from "../UI/Dropdown";

//util
import getCredentials from "../../util/getCredentials";
import getClient from "../../util/getClient";

//data
import dropdownItems from "../../data/dropdownItems";

//redux
import { useDispatch, useSelector } from "react-redux";
import { awsActions } from "../../store/awsSlice";
import { State } from "../../store";

interface CurrentDirectoryViewItemInterface {
    name: string,
    isFolder: boolean,
}

const CurrentDirectoryViewItem: React.FC<CurrentDirectoryViewItemInterface> = (
    {
        name,
        isFolder,
    }
) => {
    const credentials = getCredentials();
    const client = getClient();
    
    const [fileContent, setFileContent] = useState<string>('');
    const [openFilePreview, setOpenFilePreview] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    
    //redux
    const awsState = useSelector((state: State) => state.aws);
    const dispatch = useDispatch();
    
    const handleDoubleClick = async () => {
        
        //when we click on a file
        if( !isFolder ) {
            try {
                if( credentials && typeof credentials === 'object' && credentials.bucketName && client ) {
                    
                    const params = {
                        Bucket: credentials.bucketName,
                        Key: awsState.absolutePath + name
                    }
                    const command = new GetObjectCommand(params)
                    const response = await client.send(command)
                    
                    console.log('response from getting object data >>> ', response)
                    
                    let objectTextData;
                    if( response.Body ) {
                        objectTextData = await response.Body.transformToString();
                    }
                    
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
            dispatch(awsActions.changeAbsolutePath((awsState.absolutePath) + name + '/'))
        }
    }
    
    const handleCloseTextPreview = (shouldClose:boolean) => {
        setOpenFilePreview(!shouldClose)
    }
    
    const handleRightClick = async (e:any) => {
        e.preventDefault()
        
        if(!isFolder) {
            dispatch(awsActions.toggleDropdown(name))
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
            if( credentials && typeof credentials === 'object' && credentials.bucketName && client ) {
                const params = {
                    Bucket: credentials.bucketName,
                    Key: awsState.absolutePath + name
                }
                const command = new DeleteObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from deleting an object >>> ', response)
                if( response ) {
                    dispatch(awsActions.toggleDropdown(''))
                }
                
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
                {awsState.clickedCurrentDirectoryDropdownItem === name &&
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