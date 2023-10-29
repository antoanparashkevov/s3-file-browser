import React, { useState, Fragment, useEffect } from 'react';
import styles from './App.module.scss';

//aws-sdk
import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';

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
    
    useEffect(() => {
        if( client ) {
            fetchObjects();
        } 
    }, []);
    
    const fetchObjects = async () => {
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const response = await client.send(new ListObjectsV2Command({Bucket: credentials.bucketName}))
                
                if( response.$metadata.httpStatusCode === 200 && response.Contents ) {
                    setModifiedTree(getObjectTree(response.Contents.map((k: awsObjectElement) => k.Key)))
                }
                
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchObjects) >>> ', error)
        }
    }
    
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
    
    const createFolder = async () => {
        console.log('create folder')
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName) {
                await client.send(
                    new PutObjectCommand({
                        Bucket: credentials.bucketName,
                        Key: 'prefix/subprefix/object.txt',
                        Body: "Hello, this is the content of the new object!"
                    })
                )
            }
        } catch (err) {
            console.error('error uploading object: ', err)
        }
    }
    
    const createFile = async () => {
        console.log('create file')
    }
    
    return (
        <section className={styles["root_section"]}>
            {!hasLoggedIn ?
                <BaseDialog>
                    <SubmitForm onSaveData={handleEnteredCredentials} />
                </BaseDialog> :
                <Fragment>
                    <section className={styles['tree_view']}>
                        <DirectoryTree tree={modifiedTree} name='Root' />
                    </section>
                    <CurrentDirectory />
                    <button onClick={createFolder}>create folder</button>
                    <button onClick={createFile}>create file</button>
                </Fragment>
            }
        </section>
    );
}

export default App;
