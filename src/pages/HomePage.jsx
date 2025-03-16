import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function HomePage({title = 'Welcome to Mister Toy'}) {
    return (
        <div className='homePage'>
            <h1>{title}</h1>
            <Link to="/toys"  className='homepage__link'>View Toys</Link>
        </div>
    );
}

HomePage.PropTypes = {
    title:PropTypes.string,
};

HomePage.defaultProps = { 
    title:"Welcome to Mister Toy"
}
