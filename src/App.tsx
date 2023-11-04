import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import styles from './App.module.scss';

//aws-sdk
import {
    S3Client,
} from '@aws-sdk/client-s3';

//components
import DirectoryTree from "./components/tree/DirectoryTree";
import CurrentDirectory from "./components/currDirectory/CurrentDirectory";
import SubmitForm from "./components/submit/SubmitForm";

//UI components
import BaseDialog from "./components/UI/BaseDialog";

//interfaces
import { awsCredentials } from "./aws/credentials";

//util
import getClient from "./util/getClient";
import getCredentials from "./util/getCredentials";

//custom hooks
import useFetchObjects from "./hooks/use-fetch-objects";
import useOnlineStatus from "./hooks/use-online-status";
import getObjectTree from "./util/getObjectTree";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { State } from "./store";
import { authActions } from "./store/authSlice";
import { awsActions } from "./store/awsSlice";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

const App: React.FC = () => {
    //util
    let client = getClient();
    const credentials = getCredentials();
    
    //custom hooks
    const isOnline = useOnlineStatus()//TODO use a tooltip that indicates the network status of the user
    
    //redux
    const authState = useSelector((state: State) => state.auth);
    const awsState = useSelector((state: State) => state.aws);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log('authState', authState)
    }, [authState]);
    
    useEffect(() => {
        console.log('awsState', awsState)
    }, [awsState]);
    
    const {
        data: allObjects,
        isLoading: loadingAllObjects,
        error: errorAllObjects,
        resetError: resetErrorAllObjects,
    } = useFetchObjects();
    
    useLayoutEffect(() => {
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
    
    return (
        <Fragment>
            <section className={styles["root_section"]} onClick={() => dispatch(awsActions.toggleDropdown(''))}>
                {!authState.isAuthenticated ?
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
                                                    />
                                                )
                                            })}
                                        </section> :
                                        <p>No Data</p>
                                }
                            </Fragment>
                        }
                        <CurrentDirectory />
                    </Fragment>
                }
            </section>
        </Fragment>
    );
}

export default App;
