import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);



    useEffect(() => {
        const updateStatus = setIsOnline(navigator.onLine);
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);

        return () => {
            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);
        };


    },[]);

    return isOnline;
}