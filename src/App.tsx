import React, { useState, Fragment, useEffect } from 'react';
import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import styles from './App.module.scss';

//components
import DirectoryTree from "./components/tree/DirectoryTree";
import CurrentDirectory from "./components/currDirectory/CurrentDirectory";
import SubmitForm from "./components/submit/SubmitForm";

//UI components
import BaseDialog from "./components/UI/BaseDialog";

//credentials
import { awsCredentials } from "./aws/credentials";

//interfaces
import { awsObjectElement } from "./aws/object";
import { directoryElement } from "./aws/directory";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

let credentials: string | null | awsCredentials = localStorage.getItem('awsCredentials');

if( credentials ) {
    credentials = JSON.parse(credentials);
}

let client: any;

if( 
    credentials &&
    typeof credentials === 'object' &&
    credentials.accessKeyId && credentials.secretAccessKey
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
    const [awsObjects, setAwsObjects] = useState<awsObjectElement[]>([]);
    const [modifiedDirectories, setModifiedDirectories] = useState<directoryElement[]>([])
    
    useEffect(() => {
        if( client ) {
            fetchObjects();
        } 
    }, [])
    
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
    
    const fetchObjects = async () => {
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName ) {
                const response = await client.send(new ListObjectsV2Command({Bucket: credentials.bucketName}))
                
                if( response.$metadata.httpStatusCode === 200 && response.Contents ) {
                    setAwsObjects(response.Contents)
                }
                
                console.log('objects (fetchObjects) >>> ', response)
            } else {
                setHasLoggedIn(false);
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchObjects) >>> ', error)
        }
    }
  
    return (
        <section className={styles["root_section"]}>
            {!hasLoggedIn ?
                <BaseDialog>
                    <SubmitForm onSaveData={handleEnteredCredentials} />
                </BaseDialog> :
                <Fragment>
                    <DirectoryTree directories={modifiedDirectories} />
                    <CurrentDirectory client={client} encodedcredentials={credentials} />
                </Fragment>
            }
        </section>
    );
}

export default App;
