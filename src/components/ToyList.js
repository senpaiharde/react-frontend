import React from "react";
import styles from './ToyList.css';
import { ToyPreview } from "./ToyPreview";

export function ToyList({toys}) {
    return(
        <div className={styles}>
            {toys.map(toy => (
                <ToyPreview key={toy._id} toy={toy}/>
            ))}
        </div>
    );
    
}