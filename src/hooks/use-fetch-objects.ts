import { useEffect, useState } from "react";
import { ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

//util
import getCredentials from "../util/getCredentials";
import getClient from "../util/getClient";
import getObjectTree from "../util/getObjectTree";

interface ParamsInterface {
    Bucket: string,
    Prefix?: string,
}

const useFetchObjects = (prefix?: string) => {
    const [data, setData] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const credentials = getCredentials();
    const client = getClient();
    
    if(prefix && !prefix?.endsWith('/')) {
        prefix += '/'
    }
    
    useEffect(() => {
        console.log('DEBUG: Fetching objects ...')
        console.log('DEBUG: prefix >>> ', prefix)
        if( credentials && typeof credentials === 'object' && client ) {
            let params: ParamsInterface = {
                Bucket: credentials.bucketName
            }
            
            if(prefix) {
                params.Prefix = prefix;
            }
            
            let command = new ListObjectsV2Command(params)
            
            setIsLoading(true)
            
            client.send(command)
                .then((response: ListObjectsV2CommandOutput) => {
                    console.log('DEBUG: response >>> ', response)
                    if( response.$metadata.httpStatusCode === 200 && response.Contents ) {
                        let modifiedResponse = response.Contents.map(object => {
                            return object.Key ?? ''
                        })
                        console.log('DEBUG: modifiedResponse >>> ', modifiedResponse)
                        
                        setData(modifiedResponse);
                    } 
                    
                    if( response.$metadata.httpStatusCode === 204 ) {
                        setData(null)
                    }
                    setIsLoading(false)
                })
                .catch((error: {message: string}) => {
                    setError(error.message || 'Something went wrong')
                    setData(null);
                    setIsLoading(false)
                })
        }
        
    }, [prefix]);
    
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