import React from 'react';
import { useLocation } from 'react-router-dom';

import { editSpotInfos, fetchSpotInfos } from '../API/toServer';
import { buildAlertMsg } from '../Utils/utils';

import Edit from '../Components/Editor';

const EditRestaurants = () => {

    const spotId = useLocation().state.id;
    const spotName = useLocation().state.name;
    const [spot, setSpot] = React.useState({})

    React.useEffect(() => {
        fetchSpotInfos(spotId, setSpot);
        // eslint-disable-next-line
    }, [spotId])

    const handleSubmitEdittedSpot = (newEntry) => {
        if (window.confirm(buildAlertMsg(newEntry, 'edit'))) {
            editSpotInfos(spotId, newEntry);
        }
        else {
            console.log("Abort save")
        }
    }

    return (
        <div className='edit'>
            <h1 className='text'>Edit {spotName} infos</h1>
            <Edit spot={spot} handleSubmitEdittedSpot={handleSubmitEdittedSpot} />
        </div>
    );
};

export default EditRestaurants;