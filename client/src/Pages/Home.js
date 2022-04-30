import React from 'react';
import Finder from '../Components/Finder';

import { AppContext } from '../App';

const Home = () => {

    const context = React.useContext(AppContext);

    return (
        <div className='home'>
            <h1 className='text'>Home</h1>
            <Finder />
            <h3 className='text'>{context.restaurantsList.length} restaurants in dB !</h3>
        </div>
    );
};

export default Home;