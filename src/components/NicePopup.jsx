import { useEffect } from "react";


// global inside store easy to accuss closes in clicking ouside or qescape .


export function NicePopup({isOpen, onClose, header, footer, children }) {
    useEffect(()=> {

        const handleKeyDown = (event) => {
            if(event.key === 'Escape') {
                onClose();
            }
        };
        if(isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleOutsideClick = (event) => {
        if(event.target.classList.contains('popup-overlay')) {
            onClose();
        }
    };
    if(!isOpen) return null;


    return ( 
    <div className="popup-overlay" onClick={handleOutsideClick}>
        <div className="popup">
            <div className="popup__header">
                <h2>{header}</h2>
                <button className="popup__close" onClick={onClose}>❌</button>
            </div>
            <main className="popup-body">{children}</main>
            <footer className="popup-footer">{footer}</footer>
        </div>

    </div>
    );
}