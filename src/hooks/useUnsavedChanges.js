import { useEffect, useState } from "react";

export function useUnsavedChanges(isDirty) {
    const [isBlocked, setIsBlocked] = useState(false);


    useEffect(()=> {
        const handleBeforeUnload = (event) => {
            if(isDirty){
                event.preventDefault();
                event.returnValue = '';
            }
        };

        if(isDirty){
            setIsBlocked(true);
            window.addEventListener('beforeunload', handleBeforeUnload)
        }else{
            setIsBlocked(false);
            window.addEventListener('beforeunload', handleBeforeUnload)
        }

        return () => {
            
            window.addEventListener('beforeunload', handleBeforeUnload)
        }
    },[isDirty])

    return isBlocked;
    
}