import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div>
            <h1>Welcome to Mister Toy</h1>
            <Link to="/toys">View Toys</Link>
        </div>
    );
}
