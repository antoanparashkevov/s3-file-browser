import { useEffect, useState } from "react";
import { ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

//util
import getCredentials from "../util/getCredentials";
import getClient from "../util/getClient";

//redux
import { useSelector } from "react-redux";
import { State } from "../store";

interface ParamsInterface {
    Bucket: string,
    Prefix?: string,
}

const useFetchObjects = (prefix?: string) => {
    const [data, setData] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    //redux
    const awsState = useSelector((state: State) => state.aws);
    const authState = useSelector((state: State) => state.auth);
    
    const credentials = getCredentials();
    const client = getClient();
    
    useEffect(() => {
        // console.log('DEBUG: Fetching objects ...')
        // console.log('DEBUG: prefix >>> ', prefix)
        if( credentials && typeof credentials === 'object' && credentials.bucketName && client ) {
            let params: ParamsInterface = {
                Bucket: credentials.bucketName
            }
            
            if(prefix) {
                params.Prefix = prefix;
            }
            
            let command = new ListObjectsV2Command(params)
            
            setIsLoading(true);
            setError(null);
            
            client.send(command)
                .then((response: ListObjectsV2CommandOutput) => {
                    console.log('DEBUG: response >>> ', response)
                    if( response.$metadata.httpStatusCode === 200 ) {
                        
                        if( response.Contents ) {
                            let modifiedResponse = response.Contents.map(object => {
                                return object.Key ?? ''
                            })
                            // console.log('DEBUG: modifiedResponse >>> ', modifiedResponse)
                            
                            setData(modifiedResponse);
                        } else {
                            setData(null)
                        }
                    } 
                    
                    if( response.$metadata.httpStatusCode === 204 ) {//no content
                        setData(null)
                    }
                    setIsLoading(false)
                })
                .catch((error: {message: string}) => {
                    console.log('DEBUG: error >>> ', error)
                    setError(error.message || 'Something went wrong')
                    setData(null);
                    setIsLoading(false)
                })
        }
        
    }, [prefix, awsState.fetchCounter, authState.isAuthenticated]);
    
    const resetError = () => {
        setError(null)
    }
    
    return {
        data,
        isLoading,
        error,
        resetError,
    }
    
}

export default useFetchObjects;