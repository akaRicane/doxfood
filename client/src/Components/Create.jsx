import React from 'react';

import Dropdown from './Dropdown';
import Map from '../API/Map';
import { updateAddress, updateCoordinates, openGMaps } from '../Utils/utils';

import { OPTIONS_FOOD, OPTIONS_RATE } from '../Constants/constants';
import {
    DEFAULT_NAME, DEFAULT_DISTANCE, DEFAULT_FOOD, DEFAULT_COORDINATES,
    DEFAULT_ISVEGE, DEFAULT_ADDRESS, DEFAULT_PRICE, DEFAULT_RATE
} from '../Constants/default';

const Create = ({ handleSubmitNewSpot }) => {

    const [nameInput, setNameInput] = React.useState(DEFAULT_NAME);
    const [distance, setDistance] = React.useState(DEFAULT_DISTANCE);
    const [food, setFood] = React.useState(DEFAULT_FOOD);
    const [isVege, setIsVege] = React.useState(DEFAULT_ISVEGE);
    const [price, setPrice] = React.useState(DEFAULT_PRICE);
    const [rate, setRate] = React.useState(DEFAULT_RATE);
    const [address, setAddress] = React.useState(DEFAULT_ADDRESS);
    const [coordinates, setCoordinates] = React.useState(DEFAULT_COORDINATES);

    const handleNameInput = (event) => { setNameInput(event.target.value); }
    const handleIsVegeInput = () => {
        if (isVege === "true") {
            setIsVege("false");
            console.log("Vege -> false");
        }
        else {
            setIsVege("true");
            console.log("Vege ->  true");
        }
    };
    const handleFoodDP = (event) => { setFood(event.target.value); };
    const handlePriceInput = (event) => { setPrice(event.target.value); }
    const handleDistanceInput = (event) => { setDistance(event.target.value); }
    const handleRateDP = (event) => { setRate(event.target.value); };

    const handleStreetNum = (event) => { updateAddress("streetNum", event.target.value, address, setAddress); };
    const handleStreet = (event) => { updateAddress("street", event.target.value, address, setAddress); };
    const handleCity = (event) => { updateAddress("city", event.target.value, address, setAddress); };

    const handleLongitude = (event) => { updateCoordinates("lon", event.target.value, coordinates, setCoordinates); };
    const handleLatitude = (event) => { updateCoordinates("lat", event.target.value, coordinates, setCoordinates); };
    const handleCheckGMapsBtn = () => { openGMaps(address); };

    const submitButton = () => {
        const newEntry = {
            name: nameInput,
            food: food,
            isVege: isVege,
            price: price,
            distance: distance,
            rate: rate,
            address: address,
            coordinates: coordinates
        }
        handleSubmitNewSpot(newEntry);
    }

    return (
        <div className='module'>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input onChange={(event) => handleNameInput(event)} /></td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td>
                                <Dropdown
                                    label=" "
                                    options={OPTIONS_FOOD}
                                    value={food}
                                    onChange={handleFoodDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vege</td>
                            <td><input type='checkbox' onChange={() => handleIsVegeInput()} /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='range' min='5' max='40' onChange={(event) => handlePriceInput(event)} /></td>
                            <td>{price} €</td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><input type='range' min='0' max='30' onChange={(event) => handleDistanceInput(event)} /></td>
                            <td>{distance} min</td>
                        </tr>
                        <tr>
                            <td>Rate</td>
                            <td>
                                <Dropdown
                                    label=" "
                                    options={OPTIONS_RATE}
                                    value={rate}
                                    onChange={handleRateDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Tags</td>
                        </tr>
                        <tr>
                            <td>Favorites</td>
                        </tr>
                        <tr>
                            <td>#</td>
                            <td><input onChange={(event) => handleStreetNum(event)} /></td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td><input onChange={(event) => handleStreet(event)} /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input onChange={(event) => handleCity(event)} placeholder='Boulogne-Billancourt'/></td>
                        </tr>
                        <tr height='20'></tr>
                        <tr>
                            <td></td>
                            <td><button onClick={() => handleCheckGMapsBtn()}>Check coordinates</button> </td>
                        </tr>
                        <tr>
                            <td>Lon</td>
                            <td><input onChange={(event) => handleLongitude(event)} /></td>
                        </tr>
                        <tr>
                            <td>Lat</td>
                            <td><input onChange={(event) => handleLatitude(event)} /></td>
                        </tr>
                        <tr height='50'></tr>
                        <tr>
                            <td>
                                <button onClick={() => { submitButton() }}>Submit !</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Map />
        </div>
    );
};

export default Create;