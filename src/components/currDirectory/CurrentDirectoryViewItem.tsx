import styles from "./CurrentDirectoryViewItem.module.scss";
import React, { Fragment, useState } from "react";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";

//UI components
import BaseDialog from "../UI/BaseDialog";
import Dropdown, { dropdownItem } from "../UI/Dropdown";

//data
import dropdownItems from "../../data/dropdownItems";

//redux
import { useDispatch, useSelector } from "react-redux";
import { awsActions } from "../../store/awsSlice";
import { State } from "../../store";

//custom hooks
import useData from "../../hooks/use-data";

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
    const [fileContent, setFileContent] = useState<string>('');
    const [openFilePreview, setOpenFilePreview] = useState<boolean>(false);
    
    //custom fetch hook
    const {
        error,
        resetError,
        sendRequest
    } = useData()
    
    //redux
    const awsState = useSelector((state: State) => state.aws);
    const dispatch = useDispatch();
    
    const handleDoubleClick = async () => {
        
        //when we click on a file
        if( !isFolder ) {
            console.log('reading a file ...')
            const response: GetObjectCommandOutput | undefined | null = await sendRequest('readFile',{name})
            
            if( response && response?.Body ) {
                let objectTextData = await response.Body.transformToString();
                
                if( objectTextData ) {
                    setOpenFilePreview(true);
                    setFileContent(objectTextData);
                }
            }
        }
        //when we click on a folder
        else if( isFolder ) { 
            dispatch(awsActions.changeAbsolutePath((awsState.absolutePath) + name + '/'))
            dispatch(awsActions.changeCurrentDirectory(name))
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
        
        switch (selectedItem.code) {
            case 'delete':
                await sendRequest('deleteFile', {name})
            break;
        }
    }
    
    return (
        <Fragment>
            {error && <BaseDialog onClose={resetError} title={error} status='error' />}
            <div onContextMenu={handleRightClick} className={styles['current_directory_view_grid_item']} onDoubleClick={handleDoubleClick}>
                <img
                    src={isFolder ? '/icons/folder.svg' : '/icons/file.svg'}
                    alt="Folder"
                    width={80}
                    height={80}
                />
                <span>{name}</span>
                {awsState.clickedCurrentDirectoryDropdownItem && awsState.clickedCurrentDirectoryDropdownItem === name &&
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