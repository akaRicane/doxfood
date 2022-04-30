import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <div>
                <h3>DOXFOOD</h3>
            </div>
            <div className='text'>
                <NavLink to='/'>
                    <span>🏠 </span>
                </NavLink>
                <NavLink to='/list'>
                    <span>📚</span>
                </NavLink>
                <NavLink to='/new'>
                    <span>🧑‍🍳</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Header;