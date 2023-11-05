import React, { FormEvent, Fragment, useState } from "react";
import styles from "./CurrentDirectoryActions.module.scss";
import classNames from "classnames/bind";

//UI components
import { Button, SecondaryButton } from "../UI/BaseButtons";
import BaseDialog from "../UI/BaseDialog";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import BaseSpinner from "../UI/BaseSpinner";

//redux
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store";
import { awsActions } from "../../store/awsSlice";

//custom hooks
import useData from "../../hooks/use-data";
import useInput from "../../hooks/use-input";

const cx = classNames.bind(styles);

const CurrentDirectoryActions:React.FC = () => {
    
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isFolder, setIsFolder] = useState<boolean>(true);
    
    //custom fetch hook
    const {
        isLoading,
        error,
        resetError,
        sendRequest
    } = useData()
    
    //redux
    const awsState = useSelector((state: State) => state.aws);
    const dispatch = useDispatch();
    
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
    
    const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if( nameIsValid ) {
            
            if(!isFolder && enteredFileContent && fileContentIsValid) {
                console.log('creating a file ...')
                const response = await sendRequest('createFile',{Body: enteredFileContent, name: enteredName})
                
                if( response ) {
                    console.log('response from creating a file >>> ', response)
                    setOpenDialog(false)
                    nameReset();
                    fileContentReset()
                }
            } else if( isFolder ) {
                console.log('creating a folder ...')
                const response = await sendRequest('createDirectory',{name: enteredName})
                
                if( response ) {
                    console.log('response from creating a folder >>> ', response)
                    setOpenDialog(false)
                    nameReset();
                }
            }
        }
    }
    
    const handlePrevAction = () => {
        console.log('previous arrow clicked...');
        
        //building absolute path without a slash at the end
        const currentAbsolutePath =
            awsState.absolutePath.endsWith('/') ?
                awsState.absolutePath.slice(0, -1) :
                awsState.absolutePath
        
        //dispatching previous absolute path, so we cut the last fragment and again add a slash at the end
        let newCurrentAbsolutePath = currentAbsolutePath.split('/').slice(0,-1).join('/').length === 0 ?
            currentAbsolutePath.split('/').slice(0,-1).join('') :
            currentAbsolutePath.split('/').slice(0,-1).join('/') + '/'
        
        let newCurrentAbsolutePathAsArray:string[] = newCurrentAbsolutePath.split('/').slice(0, -1)
        let currentDirectory: string = ''
        if( newCurrentAbsolutePathAsArray.length > 0 ) {
            currentDirectory = newCurrentAbsolutePathAsArray[newCurrentAbsolutePathAsArray.length - 1]
        } else {
            currentDirectory = ''
        }
            
        dispatch(awsActions.changeAbsolutePath(newCurrentAbsolutePath));
        dispatch(awsActions.changeCurrentDirectory(currentDirectory));
    }
    
    return (
        <Fragment>
            <div className={styles['current_directory_actions']}>
                <div className={styles['current_directory_actions_navigate']}>
                    <div className={cx("arrow_wrapper", "arrow_prev")} onClick={handlePrevAction}>
                        <img src="/icons/arrow.svg" alt="Prev Icon" width={24} height={24}/>
                    </div>
                </div>
                <div className={styles['current_directory_actions_buttons']}>
                    <Button $small onClick={createFileOrFolder.bind(this, true)}>Create Folder</Button>
                    <Button $small onClick={createFileOrFolder.bind(this, false)}>Create File</Button>
                </div>
            </div>
            {openDialog &&
                <Fragment>
                    {!error ?
                        <BaseDialog onClose={handleCloseDialog}>
                            <Fragment>
                                {isLoading && <BaseSpinner />}
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
                                                    value={enteredFileContent}
                                                    onChange={fileContentChangeHandler}
                                                    onBlur={fileContentBlurHandler}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <SecondaryButton>Create</SecondaryButton>
                                </form>
                            </Fragment>
                        </BaseDialog> :
                        <BaseDialog onClose={resetError} title={error} status='error' />
                    }
                </Fragment>
            }
        </Fragment>
    )
};

export default CurrentDirectoryActions;

