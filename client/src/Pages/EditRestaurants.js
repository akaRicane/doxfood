import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Edit from '../Components/RestaurantEditor';

const EditRestaurants = (props) => {

    const spotId = useLocation().state.id;
    const spotName = useLocation().state.name;
    const [spot, setSpot] = React.useState({})

    React.useEffect(() => {
        fetchSpotInfos(spotId);
        // eslint-disable-next-line
    }, [spotId])

    const handleSubmitEdittedSpot = (newEntry) => {
        var alertStr = "You're about to save infos!";
        alertStr += "\nname : " + newEntry.name;
        alertStr += "\nfood : " + newEntry.food;
        alertStr += "\nvege : " + newEntry.vege;
        alertStr += "\nprice : " + newEntry.price;
        alertStr += "\ndistance : " + newEntry.distance;
        alertStr += "\nrate : " + newEntry.rate;
        alertStr += "\naddress : " + newEntry.address.streetNum;
        alertStr += " " + newEntry.address.street;
        alertStr += ", " + newEntry.address.city;
        if (window.confirm(alertStr)) {
            editSpotInfos(newEntry);
        }
        else {
            console.log("Abort save")
        }
    }

    const fetchSpotInfos = () => {
        console.log('Query to fetch restaurant infos to server ...');
        axios.get('https://localhost:3001/fetch', { params: { "id": spotId } })
            .then(res => {
                console.log("Fetch restaurant: " + res.data.restaurant.name);
                setSpot(res.data.restaurant);
            })
            .catch(err => {
                console.log("... server request failed !");
                console.log(err);
            });

    };

    const editSpotInfos = (newEntry) => {
        console.log('Query to edit restaurant infos to server ...');
        axios.get('https://localhost:3001/edit', { params: { "id": spotId, "spot": newEntry } })
            .then(res => {
                console.log("Editted restaurant: " + res.data);
            })
            .catch(err => {
                console.log("... server request failed !");
                console.log(err);
            });
    }

    return (
        <div className='edit'>
            <h1 className='text'>Edit Restaurants</h1>
            <Edit spot={spot} handleSubmitEdittedSpot={handleSubmitEdittedSpot} />
            <h2 className='text'>{spotName} / {spotId}</h2>
        </div>
    );
};

export default EditRestaurants;