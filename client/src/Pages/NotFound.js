import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='notFound'>
            <h1>
                Not found
            </h1>
            <NavLink to='/'>
                <span>Back to home page !</span>
            </NavLink>
        </div>
    );
};

export default NotFound;