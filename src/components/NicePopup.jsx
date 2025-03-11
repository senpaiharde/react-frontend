import { useEffect } from "react";





export function NicePopup({isOpen, onClose, header, footer, childern}) {
    useEffect(()=> {

        const handleKeyDown = (event) => {
            if(event.key === 'Escape') {
                onClose();
            }
        };
        if(isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.addEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleOutsideClick = (event) => {
        if(event.target.className.contains('popup-overlay')){
            onClose();
        }
    };
    if(!isOpen) return null;


    return ( 
    <div className="popup-overlay" onClick={handleOutsideClick}>
        <div className="popup-content">
            <header className="popup-header">
                <h3>{header}</h3>
                <button onClick={onclose}>❌</button>
            </header>
            <main className="popup-main">{childern}</main>
            <footer className="popup-footer">{footer}</footer>
        </div>

    </div>
    );
}