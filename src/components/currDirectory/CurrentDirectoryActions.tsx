import React, { Fragment, useRef, useState } from "react";
import styles from "./CurrentDirectoryActions.module.scss";
import classNames from "classnames/bind";

//UI components
import { Button, SecondaryButton } from "../UI/BaseButtons";
import BaseDialog from "../UI/BaseDialog";
import Input from "../UI/Input";
import useInput from "../../hooks/use-http";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client, credentials } from "../../App";
import TextArea from "../UI/TextArea";

const cx = classNames.bind(styles);

interface CurrentDirectoryActionsInterface {
    currentPrefix: string,
    onPrevAction: (changedPrefix: string) => void
}

const CurrentDirectoryActions:React.FC<CurrentDirectoryActionsInterface> = (
    {currentPrefix, onPrevAction}
) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isFolder, setIsFolder] = useState<boolean>(true)
    
    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput((value) => value.trim() && value.trim().length > 3) 
    
    const {
        value: enteredFileContent,
        isValid: fileContentIsValid,
        hasError: fileContentHasError,
        valueChangeHandler: fileContentChangeHandler,
        inputBlurHandler: fileContentBlurHandler,
        reset: fileContentReset
    } = useInput((value) => value.trim() && value.trim().length > 10)
    
    const createFileOrFolder = (createFolder: boolean = true) => {
        setOpenDialog(true)
        setIsFolder(createFolder)
    }
    
    const handleCloseDialog = (shouldClose: boolean) => {
        setOpenDialog(!shouldClose)
    }
    
    const handleFormSubmission = async (e: any) => {
        e.preventDefault()
        
        if( nameIsValid ) {
            console.log('enteredName >>> ', enteredName)
            try {
                if( credentials && typeof credentials === 'object' && credentials.bucketName) {
                    
                    const params:{Bucket: string, Key: string, Body?: string} = {
                        Bucket: credentials.bucketName,
                        Key: currentPrefix + enteredName + (!isFolder ? '.txt' : ''),
                    }
                    
                    if(!isFolder && enteredFileContent && fileContentIsValid ) {
                        params.Body = enteredFileContent
                    }
                    
                    const command = new PutObjectCommand(params)
                    const response = await client.send(command)
                    
                    if( response ) {
                        setOpenDialog(false)
                        nameReset();
                        fileContentReset()
                    }
                    
                    console.log('response from creating an object >>> ', response)
                    
                }
            } catch (err) {
                console.error('error uploading object: ', err)
            }
        }
    }
    
    const handlePrevAction = () => {
        console.log('currentPrefix (prevAction) >>> ', currentPrefix)
        // onPrevAction(currentPrefix)
    }
    
    return (
        <Fragment>
            <div className={styles['current_directory_actions']}>
                <div className={styles['current_directory_actions_navigate']}>
                    <div className={cx("arrow_wrapper", "arrow_prev")} onClick={handlePrevAction}>
                        <img src="/icons/arrow.svg" alt="Prev Icon" width={24} height={24}/>
                    </div>
                    <div className={cx("arrow_wrapper", "arrow_next")}>
                        <img src="/icons/arrow.svg" alt="Next Icon" width={24} height={24}/>
                    </div>
                </div>
                <div className={styles['current_directory_actions_buttons']}>
                    <Button $small onClick={createFileOrFolder.bind(this, true)}>Create Folder</Button>
                    <Button $small onClick={createFileOrFolder.bind(this, false)}>Create File</Button>
                </div>
            </div>
            {openDialog &&
                <BaseDialog onClose={handleCloseDialog}>
                    <form className={styles['submit_form']} onSubmit={handleFormSubmission}>
                        <div className={cx('form_control', {'invalid': nameHasError})}>
                            <label htmlFor="name">Name your new {isFolder ? 'folder' : 'file'}</label>
                            <Input
                                id='name'
                                type='text'
                                name='name'
                                enteredValue={enteredName}
                                onChangeHandler={nameChangeHandler}
                                onBlurHandler={nameBlurHandler}
                                reset={nameReset}
                            />
                        {!isFolder &&
                            <div className={cx('form_control', {'invalid': fileContentHasError})}>
                                <label htmlFor="file">Enter file content</label>
                                <TextArea 
                                    id="file" 
                                    name="fileContent"
                                    cols={33}
                                    rows={10}
                                    value={enteredFileContent}
                                    onChange={fileContentChangeHandler}
                                    onBlur={fileContentBlurHandler}
                                />
                            </div>
                        }
                        </div>
                        <SecondaryButton>Create</SecondaryButton>
                    </form>
                </BaseDialog>
            }
        </Fragment>
    )
};

export default CurrentDirectoryActions;