import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [status, setStatus] = useState<string>('');
    
    useEffect(() => {
        function handleOnline() {
            console.log('online')
            setStatus('online');
        }
        
        function handleOffline() {
            console.log('offline')
            setStatus('offline')
        }
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        //cleanup function
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    }, [])
    
    return status;
}

export default useOnlineStatus;