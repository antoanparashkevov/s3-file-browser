import { useState } from "react";
import {
    DeleteObjectCommand, DeleteObjectCommandOutput,
    GetObjectCommand, GetObjectCommandOutput,
    ListObjectsV2Command, ListObjectsV2CommandOutput,
    PutObjectCommand,
    PutObjectCommandOutput
} from "@aws-sdk/client-s3";

//redux
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store";
import { awsActions } from "../store/awsSlice";

//util
import getCredentials from "../util/getCredentials";
import getClient from "../util/getClient";

//interfaces
import { awsCredentials } from "../interfaces/credentials";

interface ParamsInterface {
    Bucket: string,
    Key: string,
    Body?: string,
}

type actionType = 'createDirectory' | 'createFile' | 'deleteFile' | 'readFile'

const useData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const credentials: awsCredentials | null = getCredentials();
    const client = getClient();
    
    //redux
    const awsState = useSelector((state: State) => state.aws);
    const dispatch = useDispatch()
    
    const sendRequest = async (
        action: actionType,
        data: { Body?: string, name: string },
        params?:{Body: string},
    ) => {
        
        setIsLoading(true);
        setError(null);
        
        try {
            if( credentials && typeof credentials === 'object' && credentials.bucketName && client) {
                
                const params: ParamsInterface = {
                    Bucket: credentials.bucketName,
                    Key: awsState.absolutePath + data.name,
                }
                
                let command;
                
                switch (action) {
                    case "createDirectory":
                        command = new PutObjectCommand(params);
                    break;
                    case "createFile":
                        params.Key += '.txt';
                        params.Body = data.Body;
                        
                        command = new PutObjectCommand(params);
                    break;
                    case "deleteFile":
                        command = new DeleteObjectCommand(params);
                    break;
                    case "readFile":
                        command = new GetObjectCommand(params);
                    break;
                }
                
                let response: 
                    PutObjectCommandOutput | 
                    DeleteObjectCommandOutput | 
                    GetObjectCommandOutput | 
                    ListObjectsV2CommandOutput = await client.send(command);
                
                if( 
                    response &&
                    (
                        response.$metadata.httpStatusCode === 200 || 
                        (response.$metadata.httpStatusCode === 204 && action === 'deleteFile')
                    )
                ) {
                    
                    if( action !== 'readFile' ) {
                        dispatch(awsActions.fetchData())
                    }
                    
                    setIsLoading(false)
                    return response;
                }
                setIsLoading(false)
                return null;
            }
        } catch (error: any) {
            setIsLoading(false)
            setError(error.message || 'Something went wrong!');
        }
    }
    
    const resetError = () => {
        setError(null);
    }
    
    return {
        isLoading,
        error,
        resetError,
        sendRequest
    }
}

export default useData;