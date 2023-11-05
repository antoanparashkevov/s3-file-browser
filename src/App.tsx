import React, { Fragment, useLayoutEffect } from 'react';
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
import Notification from "./components/UI/Notification";
import { Button } from "./components/UI/BaseButtons";

//interfaces
import { awsCredentials } from "./interfaces/credentials";

//util
import getClient from "./util/getClient";
import setCredentials from "./util/setCredentials";
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
import BaseSpinner from "./components/UI/BaseSpinner";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

const App: React.FC = () => {
    //util
    let client = getClient();
    const credentials: awsCredentials | null = getCredentials();
    
    //custom hooks
    const networkStatus = useOnlineStatus()
    
    //redux
    const authState = useSelector((state: State) => state.auth);
    const dispatch = useDispatch();
    
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
        
        //encrypts the credentials and add the encrypted credentials into localstorage for persistence
        setCredentials(data);
        
        dispatch(authActions.login());
        
        //Update the S3 client with the new credentials
        client = new S3Client({
            region,
            credentials: {
                accessKeyId: data.accessKeyId,
                secretAccessKey:data.secretAccessKey
            }
        })
    }
    
    return (
        <Fragment>
            <section className={styles["root_section"]} onClick={() => dispatch(awsActions.toggleDropdown(''))}>
                {errorAllObjects && authState.isAuthenticated &&
                    <BaseDialog onClose={resetErrorAllObjects} title={errorAllObjects} status='error'>
                        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', columnGap: '15px'}}>
                            <Button onClick={() => dispatch(awsActions.fetchData())}>Try again</Button>
                            <Button onClick={() => dispatch(authActions.logout())}>Logout</Button>
                        </div>
                    </BaseDialog>
                }
                {!authState.isAuthenticated ?
                    <BaseDialog title='Enter your S3 Credentials'>
                        <SubmitForm onSaveData={handleEnteredCredentials} />
                    </BaseDialog> 
                    :
                    <Fragment>
                        <section className={styles['tree_view']}>
                            {loadingAllObjects ? <BaseSpinner /> :
                                <Fragment>
                                    {allObjects ?
                                        <Fragment>
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
                                        </Fragment> :
                                        <p>No Data</p>
                                    }
                                </Fragment>
                            }
                        </section>
                        <CurrentDirectory />
                        {networkStatus &&
                            <Notification status={networkStatus}>
                                { networkStatus.charAt(0).toUpperCase() + networkStatus.slice(1) }
                            </Notification>
                        }
                    </Fragment>
                }
            </section>
        </Fragment>
    );
}

export default App;
