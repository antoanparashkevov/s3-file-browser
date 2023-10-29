import React, { FormEvent, Fragment, useEffect, useState } from "react";
import styles from './SubmitForm.module.scss';
import classNames from "classnames/bind";

//UI components
import Input from "../UI/Input";

//custom hooks
import useInput from "../../hooks/use-http";
import { SecondaryButton } from "../UI/BaseButtons";

//interface
import { awsCredentials } from "../../aws/credentials";

const cx = classNames.bind(styles);

interface SubmitFormProps {
    onSaveData: ({}: awsCredentials) => void
}

const SubmitForm: React.FC<SubmitFormProps> = ({onSaveData}) => {
    const [formIsValid, setFormIsValid] = useState<boolean>(false)
    
    const {
        value: enteredAccessKey,
        isValid: accessKeyIsValid,
        hasError: accessKeyHasError,
        valueChangeHandler: accessKeyChangeHandler,
        inputBlurHandler: accessKeyBlurHandler,
        reset: accessKeyReset
    } = useInput(value => value.trim() && value.trim().length > 6, "")
    
    const {
        value: enteredSecretKey,
        isValid: secretKeyIsValid,
        hasError: secretsKeyHasError,
        valueChangeHandler: secretKeyChangeHandler,
        inputBlurHandler: secretKeyBlurHandler,
        reset: secretKeyReset
    } = useInput(value => value.trim() && value.trim().length > 6, "")
    
    const {
        value: enteredBucketName,
        isValid: bucketNameIsValid,
        hasError: bucketNameHasError,
        valueChangeHandler: bucketNameChangeHandler,
        inputBlurHandler: bucketNameBlurHandler,
        reset: bucketNameReset
    } = useInput(value => value.trim() && value.trim().length > 6, "")
    
    const formSubmissionHandler = async (event: FormEvent) => {
        //the default behavior is if the form is submitted, an HTTP req is sent to the server pointing the same address,
        //we don't want that -> event.preventDefault()
        event.preventDefault();
        
        console.log('enteredAccessKey >>> ', enteredAccessKey)
        console.log('enteredSecretKey >>> ', enteredSecretKey)
        console.log('enteredBucketName >>> ', enteredBucketName)
        
        if( enteredSecretKey && enteredSecretKey && enteredBucketName ) {
            onSaveData({
                accessKeyId: enteredAccessKey,
                secretAccessKey: enteredSecretKey,
                bucketName: enteredBucketName
            })
        }
        
    };
    
    useEffect(() => {
        setFormIsValid((accessKeyIsValid && secretKeyIsValid && bucketNameIsValid));
    }, [accessKeyIsValid, secretKeyIsValid, bucketNameIsValid])
    
    return (
        <Fragment>
            <form onSubmit={ formSubmissionHandler } className={cx("submit_form")}>
                
                <div className={cx("form_control", {"invalid": accessKeyHasError})}>
                    <label htmlFor="access_key">Access Key Id</label>
                    <Input 
                        id='access_key' 
                        type='text'
                        name='access_key'
                        placeholder='Enter your access key'
                        iconSrc='/icons/lock.svg'
                        iconAlt='Lock'
                        iconWidth={24}
                        iconHeight={24}
                        showRemoveIcon={enteredAccessKey.toString().length > 0}
                        enteredValue={enteredAccessKey}
                        onChangeHandler={accessKeyChangeHandler}
                        onBlurHandler={accessKeyBlurHandler}
                        reset={accessKeyReset}
                    />
                </div>
                
                <div className={cx("form_control", {"invalid": secretsKeyHasError})}>
                    <label htmlFor="secret_key">Secret key</label>
                    <Input
                        id='secret_key'
                        type='text'
                        name='secret_key'
                        placeholder='Enter your secret key'
                        iconSrc='/icons/lock.svg'
                        iconAlt='Lock'
                        iconWidth={24}
                        iconHeight={24}
                        showRemoveIcon={enteredSecretKey.toString().length > 0}
                        enteredValue={enteredSecretKey}
                        onChangeHandler={secretKeyChangeHandler}
                        onBlurHandler={secretKeyBlurHandler}
                        reset={secretKeyReset}
                    />
                </div>
                
                <div className={cx("form_control", {"invalid": bucketNameHasError})}>
                    <label htmlFor="bucket_name">Bucket name</label>
                    <Input
                        id='bucket_name'
                        type='text'
                        name='bucket_name'
                        placeholder='Enter your bucket name'
                        iconSrc='/icons/lock.svg'
                        iconAlt='Lock'
                        iconWidth={24}
                        iconHeight={24}
                        showRemoveIcon
                        enteredValue={enteredBucketName}
                        onChangeHandler={bucketNameChangeHandler}
                        onBlurHandler={bucketNameBlurHandler}
                        reset={bucketNameReset}
                    />
                </div>
                
                <div className={cx("form_actions")}>
                    <SecondaryButton 
                        type='submit'
                        disabled={!formIsValid}
                    >
                        Submit
                    </SecondaryButton>
                </div>
            </form>
        </Fragment>
    )
};

export default SubmitForm;