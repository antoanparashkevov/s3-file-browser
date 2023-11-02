import React, { useState, Fragment, useEffect } from 'react';
import styles from './App.module.scss';

//aws-sdk
import {
    S3Client,
    ListObjectsV2Command,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand
} from '@aws-sdk/client-s3';

//components
import DirectoryTree from "./components/tree/DirectoryTree";
import CurrentDirectory from "./components/currDirectory/CurrentDirectory";
import SubmitForm from "./components/submit/SubmitForm";

//UI components
import BaseDialog from "./components/UI/BaseDialog";

//interfaces
import { awsCredentials } from "./aws/credentials";
import { awsObjectElement } from "./aws/object";

//utils
import getObjectTree, { tree } from "./utils/getObjectTree";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

let credentials: string | null | awsCredentials = typeof localStorage.getItem('awsCredentials') === 'string' ? JSON.parse(localStorage.getItem('awsCredentials') || '') : null;

let client: any;

if( 
    credentials &&
    typeof credentials === 'object' &&
    (credentials.accessKeyId && credentials.secretAccessKey)
) {
    client = new S3Client({
        region,
        credentials: {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey
        }
    })
}

const App: React.FC = () => {
    const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(!!client);
    const [modifiedTree, setModifiedTree] = useState<tree>({})
    const [currentDirectory, setCurrentDirectory] = useState([])
    
    useEffect(() => {
        if( client ) {
            fetchAllObjectsFromABucket();
        } 
    }, []);
    
    const handleEnteredCredentials = (data: awsCredentials) => {
        setHasLoggedIn(true)
        
        localStorage.setItem('awsCredentials', JSON.stringify(data))
        
        //Update the S3 client with the new credentials
        client = new S3Client({
            region,
            credentials: {
                accessKeyId: data.accessKeyId,
                secretAccessKey:data.secretAccessKey
            }
        })
        
        console.log('client >>> ', client)
    }
    
    const fetchAllObjectsFromABucket = async () => {
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const params = {
                    Bucket: credentials.bucketName
                }
                const command = new ListObjectsV2Command(params)
                const response = await client.send(command)
                
                console.log('response from fetching objects from a bucket >>>', response)
                
                if( response.$metadata.httpStatusCode === 200 && response.Contents ) {
                    setModifiedTree(getObjectTree(response.Contents.map((k: awsObjectElement) => k.Key)))
                    setCurrentDirectory(response.Contents.map((k: awsObjectElement) => k.Key))
                }
                
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    const fetchObjectsFromSomePrefix = async (absolutePath: string) => {
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const params = {
                    Bucket: credentials.bucketName,
                    Prefix: absolutePath
                }
                const command = new ListObjectsV2Command(params)
                const response = await client.send(command)
                
                console.log('response from fetching objects from some prefix >>> ', response)
                if( response.Contents ) {
                    setCurrentDirectory(response.Contents.map((k: awsObjectElement) => k.Key.replace(absolutePath, '').split('/')[0]))
                } else {
                    setCurrentDirectory([])
                }
                
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    const createObject = async () => {
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName) {
                
                const params = {
                    Bucket: credentials.bucketName,
                    Key: 'prefix/subprefix/deeperprefix',
                    Body: "Hello from deeperprefix (nothing)"
                }
                
                const command = new PutObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from creating an object >>> ', response)
            }
        } catch (err) {
            console.error('error uploading object: ', err)
        }
    }
    
    const getObjectData = async () => {

        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                
                const params = {
                    Bucket: credentials.bucketName,
                    Key: 'prefix/subprefix/deeperprefix'
                }
                const command = new GetObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from getting object data >>> ', response)
                
                const objectTextData = await response.Body.transformToString();
                
                console.log('objectTextData from getting object data >>> ', objectTextData)
                
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    const deleteObject = async () => {
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const params = {
                    Bucket: credentials.bucketName,
                    Key: 'prefix/subprefix/object.txt'
                }
                const command = new DeleteObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from deleting an object >>> ', response)
                
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    return (
        <Fragment>
            <section className={styles["root_section"]}>
                {!hasLoggedIn ?
                    <BaseDialog>
                        <SubmitForm onSaveData={handleEnteredCredentials} />
                    </BaseDialog> :
                    <Fragment>
                        <section className={styles['tree_view']}>
                            <DirectoryTree 
                                tree={modifiedTree} 
                                name='Root' 
                                absolutePath=''
                                onDoubleClick={fetchObjectsFromSomePrefix} 
                            />
                        </section>
                        <CurrentDirectory currentDirectory={currentDirectory} />
                    </Fragment>
                }
            </section>
            <br/>
            <button onClick={fetchAllObjectsFromABucket}>Fetch all objects from a bucket</button>
            <button onClick={fetchObjectsFromSomePrefix.bind(this, 'prefix/subprefix')}>Fetch objects from some prefix</button>
            <button onClick={createObject}>create object</button>
            <button onClick={getObjectData}>getting object data </button>
            <button onClick={deleteObject}>delete object</button>
        </Fragment>
    );
}

export default App;
