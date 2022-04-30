import React from 'react';
import axios from 'axios';

import Create from '../Components/Create';

const NewRestaurant = () => {

    const handleSubmitNewSpot = (newEntry) => {
        var alertStr = "You're about to make a new entry !";
        alertStr += "\nname : " + newEntry.name;
        alertStr += "\nfood : " + newEntry.food;
        alertStr += "\nvege : " + newEntry.isVege;
        alertStr += "\nprice : " + newEntry.price;
        alertStr += "\ndistance : " + newEntry.distance;
        alertStr += "\nrate : " + newEntry.rate;
        alertStr += "\naddress : " + newEntry.address.streetNum;
        alertStr += " " + newEntry.address.street;
        alertStr += ", " + newEntry.address.city;
        if (window.confirm(alertStr)) {
            addNewSpot(newEntry);
        }
        else {
            console.log("Abort submit")
        }
    }

    const addNewSpot = (newEntry) => {
        console.log('Query to add entry to server ...');
        axios.get('https://localhost:3001/create', { params: { "spot": newEntry } })
            .then(res => {
                console.log("Added to database: " + res.data);
            })
            .catch(err => {
                console.log("... server request failed !");
                console.log(err);
            });

    };

    return (
        <div className='new'>
            <h1 className='text'>New entry</h1>
            <Create handleSubmitNewSpot={handleSubmitNewSpot} />
        </div>
    );
};

export default NewRestaurant;