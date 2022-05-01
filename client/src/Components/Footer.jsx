import React from 'react';

import { AppContext } from '../App';

const Footer = () => {

    const context = React.useContext(AppContext);

    return (
        <header className='footer'>
            <p className='text'>{context.restaurantsList.length} restaurants in dB !</p>
        </header>
    );
};

export default Footer;