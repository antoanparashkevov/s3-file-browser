export default function getCredentials() {
    let credentials = localStorage.getItem('awsCredentials');
    //TODO decrypt the credentials
    if( credentials ) {
        return JSON.parse(credentials)
    }
    
    return null;
    
}