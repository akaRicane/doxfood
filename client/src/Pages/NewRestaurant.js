import React from 'react';

import Create from '../Components/Create';

import { addNewSpot } from '../API/toServer';
import { buildAlertMsg } from '../Utils/utils';

const NewRestaurant = () => {

    const handleSubmitNewSpot = (newEntry) => {
        if (window.confirm(buildAlertMsg(newEntry, 'create'))) {
            addNewSpot(newEntry);
        }
        else {
            console.log("Abort submit")
        }
    }

    return (
        <div className='new'>
            <h1 className='text'>New entry</h1>
            <Create handleSubmitNewSpot={handleSubmitNewSpot} />
        </div>
    );
};

export default NewRestaurant;