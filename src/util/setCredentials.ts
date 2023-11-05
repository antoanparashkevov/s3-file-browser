import { awsCredentials } from "../interfaces/credentials";
import CryptoJS from "crypto-js";

const setCredentials = (credentials: awsCredentials) => {
    
    if( localStorage.getItem('awsCredentials') ) {
        localStorage.clear();
    }
    
    const encryptedCredentials = CryptoJS.AES.encrypt(
        JSON.stringify(credentials),
        process.env['REACT_APP_CRYPTO_SECRET_KEY'] ?? 'my_encryption_key',
        {
            format: CryptoJS.format.OpenSSL,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString()
    
    if( encryptedCredentials ) {
        localStorage.setItem('awsCredentials', encryptedCredentials);
    }
}

export default setCredentials;