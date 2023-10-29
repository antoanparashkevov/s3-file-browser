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
import { credentials } from "./aws/credentials";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];
console.log('region >>> ', region)

let encodedCredentials: string | null | credentials = localStorage.getItem('awsCredentials');
console.log('encodedCredentials (not parsed) >>> ', encodedCredentials);

if( encodedCredentials ) {
    encodedCredentials = JSON.parse(encodedCredentials);
}

console.log('encodedCredentials (parsed) >>> ', encodedCredentials)

let client: any;

if( encodedCredentials && typeof encodedCredentials === 'object' && encodedCredentials.accessKeyId && encodedCredentials.secretAccessKey ) {
    client = new S3Client({
        region,
        credentials: {
            accessKeyId: encodedCredentials.accessKeyId,
            secretAccessKey: encodedCredentials.secretAccessKey
        }
    })
}

// const data = await client.send(new ListObjectsV2Command({
//     Bucket: "llib-236960695173-1"
// }));

const App: React.FC = () => {
    const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(!!client);
    const [objects, setObjects] = useState([]);
    
    useEffect(() => {
        
        fetchObjects();
    }, [])
    
    const handleEnteredCredentials = (data: credentials) => {
        console.log('entered data >>> ', data);
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
            if(encodedCredentials && typeof encodedCredentials === 'object') {
                const data = await client.send(new ListObjectsV2Command({Bucket: encodedCredentials.bucketName}))
                setObjects(data.Contents)
                console.log('fetched Objects >>> ', data)
            } else {
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.error('Error listing objects >>> ', error)
        }
    }
  
    return (
        <section className={styles["root_section"]}>
            {!hasLoggedIn ?
                <BaseDialog>
                    <SubmitForm onSaveData={handleEnteredCredentials} />
                </BaseDialog> :
                <Fragment>
                    <DirectoryTree directories={objects} />
                    <CurrentDirectory client={client} encodedcredentials={encodedCredentials} />
                </Fragment>
            }
        </section>
    );
}

export default App;
