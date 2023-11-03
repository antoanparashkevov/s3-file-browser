import { S3Client } from "@aws-sdk/client-s3";

//util
import getCredentials from "./getCredentials";

const region: string | undefined = process.env['REACT_APP_AWS_REGION'];

export default function getClient () {
    const credentials = getCredentials();
    let client = null
    
    if( credentials && region ) {
        client = new S3Client({
            region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey
            }
        })
    }
    
    return client;
}