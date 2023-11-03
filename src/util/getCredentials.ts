export default function getCredentials() {
    let credentials = localStorage.getItem('awsCredentials');
    
    if( credentials ) {
        return JSON.parse(credentials)
    }
    
    return null;
    
}