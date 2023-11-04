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

//util
import getClient from "./util/getClient";
import getCredentials from "./util/getCredentials";

//custom hooks
import useFetchObjects from "./hooks/use-fetch-objects";
import useOnlineStatus from "./hooks/use-online-status";
import getObjectTree from "./util/getObjectTree";

//redux
import { authActions, Store } from "./store";
import { useSelector, useDispatch } from 'react-redux';

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

const App: React.FC = () => {
    //util
    let client = getClient();
    const credentials = getCredentials();
    
    //custom hooks
    const isOnline = useOnlineStatus()//TODO use a tooltip that indicates the network status of the user
    
    //redux
    const authState = useSelector((state: Store) => state.auth);
    const dispatch = useDispatch();
    
    //state
    const [currentPrefix, setCurrentPrefix] = useState('');
    
    const {
        data: allObjects,
        isLoading: loadingAllObjects,
        error: errorAllObjects,
        resetError: resetErrorAllObjects,
    } = useFetchObjects();
    
    useEffect(() => {
        if(!credentials) {
            dispatch(authActions.logout())
        } else {
            dispatch(authActions.login())
        }
    }, []);
    
    const handleEnteredCredentials = (data: awsCredentials) => {
        
        if( localStorage.getItem('awsCredentials') ) {
            localStorage.clear();
        }
        
        dispatch(authActions.login());
        //TODO setCredentials function that encrypts the credentials
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
    
    const fetchAllObjectsFromABucket = () => {
        console.log('fetching all objects from a bucket...')
    }
    
    const fetchObjectsFromSomePrefix = (absolutePath: string) => {
        console.log('fetch objects from some prefix...')
        console.log('absolutePath >>> ', absolutePath)
    }
    
    const createObject = async () => {
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName && client) {
                
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
            dispatch(authActions.logout())
            console.error('error uploading object: ', err)
        }
    }
    
    const getObjectData = async () => {

        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName && client ) {
                
                const params = {
                    Bucket: credentials.bucketName,
                    Key: 'prefix/subprefix/deeperprefix'
                }
                const command = new GetObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from getting object data >>> ', response)
                
                let objectTextData;
                if( response.Body ) {
                    objectTextData = await response.Body.transformToString();
                }
                
                console.log('objectTextData from getting object data >>> ', objectTextData)
                
            } else {
                dispatch(authActions.logout())
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    const deleteObject = async () => {
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName && client ) {
                const params = {
                    Bucket: credentials.bucketName,
                    Key: 'prefix/subprefix/object.txt'
                }
                const command = new DeleteObjectCommand(params)
                const response = await client.send(command)
                
                console.log('response from deleting an object >>> ', response)
                
            } else {
                dispatch(authActions.logout())
                throw new Error("An error occurred while fetching objects");
            }
        } catch (error) {
            console.log('error from (fetchAllObjectsFromABucket) >>> ', error)
        }
    }
    
    return (
        <Fragment>
            <section className={styles["root_section"]}>
                {!authState.hasLoggedIn ?
                    <BaseDialog title='Enter your S3 Credentials'>
                        <SubmitForm onSaveData={handleEnteredCredentials} />
                    </BaseDialog> 
                    :
                    <Fragment>
                        {loadingAllObjects ? 'loading...' :
                            <Fragment>
                                {
                                    allObjects ?
                                        <section className={styles['tree_view']}>
                                            {Object.keys(getObjectTree(allObjects)).map(node => {
                                                return (
                                                    <DirectoryTree
                                                        key={node}
                                                        tree={getObjectTree(allObjects)[node]}
                                                        name={node}
                                                        absolutePath={node + '/'}
                                                        onDoubleClick={fetchObjectsFromSomePrefix}
                                                    />
                                                )
                                            })}
                                        </section> :
                                        <p>No Data</p>
                                }
                            </Fragment>
                        }
                        <CurrentDirectory 
                            onChangeFolder={fetchObjectsFromSomePrefix} 
                            currentPrefix={currentPrefix} 
                        />
                    </Fragment>
                }
            </section>
            <br/>
            <span>isOnline {isOnline.toString()}</span>
            <button onClick={() => setCurrentPrefix('prefix/subprefix')}>Get prefix only</button>
            <button onClick={fetchAllObjectsFromABucket}>Fetch all objects from a bucket</button>
            <button onClick={fetchObjectsFromSomePrefix.bind(this, 'prefix/subprefix')}>Fetch objects from some prefix</button>
            <button onClick={createObject}>create object</button>
            <button onClick={getObjectData}>getting object data </button>
            <button onClick={deleteObject}>delete object</button>
        </Fragment>
    );
}

export default App;
