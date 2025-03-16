import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    
    

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            console.log("🟢 Online: Connection Restored.");

        }

        const handleOffline = () => {
            setIsOnline(false);
            console.log("🔴 Offline: Connection Lost.");
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        console.log("🔄 Initial Status:", navigator.onLine ? "🟢 Online" : "🔴 Offline");

        return () => {
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
        };


    },[]);

    return isOnline;
}