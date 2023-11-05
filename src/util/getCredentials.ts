import CryptoJS from "crypto-js";

export default function getCredentials() {
    let encryptedCredentials = localStorage.getItem('awsCredentials');
    
    if( encryptedCredentials ) {
        const decryptedBytes = CryptoJS.AES.decrypt(
            encryptedCredentials,
            process.env['REACT_APP_CRYPTO_SECRET_KEY'] ?? 'my_encryption_key',
            {
                format: CryptoJS.format.OpenSSL,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
            }
        )
        
        const decryptedCredentials = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
        
        return decryptedCredentials;
    }
    
    return null;
    
}