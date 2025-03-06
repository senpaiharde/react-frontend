import React from 'react';
import { toyService } from '../services/toyService';
import { ToyList } from '../components/ToyList';


export function ToyPage() {
    const toys = toyService.getToys();


    return(
        <div>
            <h1>Our Toys</h1>
            <ToyList toys={toys}/>
        </div>
    )
    
}