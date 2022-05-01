import React from 'react';

import Dropdown from './Dropdown';
import Map from '../API/Map';
import { openGMaps } from '../Utils/utils';

import { OPTIONS_FOOD, OPTIONS_RATE } from '../Constants/constants';
import { DEFAULT_ADDRESS, DEFAULT_COORDINATES, DEFAULT_PINMAP } from '../Constants/default';

const Editor = ({ spot, handleSubmitEdittedSpot }) => {

    const [name, setName] = React.useState(spot.name);
    const [distance, setDistance] = React.useState(spot.distance);
    const [food, setFood] = React.useState(spot.food);
    const [isVege, setIsVege] = React.useState(spot.isVege);
    const [price, setPrice] = React.useState(spot.price);
    const [rate, setRate] = React.useState(spot.rate);
    const [address, setAddress] = React.useState(DEFAULT_ADDRESS);
    const [coordinates, setCoordinates] = React.useState(DEFAULT_COORDINATES);
    const [pinMap, setPinMap] = React.useState(DEFAULT_PINMAP);

    const updateAddressCallback = React.useCallback((item, value) => {
        var currentAddress = address;
        switch (item) {
            case "streetNum":
                currentAddress.streetNum = value;
                break;
            case "street":
                currentAddress.street = value;
                break;
            case "city":
                currentAddress.city = value;
                break;
            default:
                break;
        }
        setAddress(currentAddress);
    }, [address]);

    const updateCoordinatesCallback = React.useCallback((item, value) => {
        var currentCoords = coordinates;
        switch (item) {
            case "lon":
                currentCoords.lon = value;
                break;
            case "lat":
                currentCoords.lat = value;
                break;
            default:
                break;
        }
        setCoordinates(currentCoords);
    }, [coordinates]);

    const updatePinMapCallback = React.useCallback((item, value) => {
        var currentPin = pinMap;
        switch (item) {
            case "label":
                currentPin.label = value;
                break;
            case "lon":
                currentPin.coordinates.lon = value;
                break;
            case "lat":
                currentPin.coordinates.lat = value;
                break;
            default:
                break;
        }
        setPinMap(currentPin);
    }, [pinMap]);

    React.useEffect(() => {
        if (spot.name !== undefined) {
            setName(spot.name);
            setIsVege(Boolean(spot.isVege));
            setFood(spot.food);
            setPrice(spot.price);
            setDistance(spot.distance);
            setRate(spot.rate);
            updateAddressCallback("streetNum", spot.address.streetNum);
            updateAddressCallback("street", spot.address.street);
            updateAddressCallback("city", spot.address.city);
            updateCoordinatesCallback("lon", spot.coordinates.lon);
            updateCoordinatesCallback("lat", spot.coordinates.lat);
            updatePinMapCallback("label", spot.name);
            updatePinMapCallback("lon", spot.coordinates.lon);
            updatePinMapCallback("lat", spot.coordinates.lat);
        }
        // eslint-disable-next-line
    }, [spot, updateAddressCallback, updateCoordinatesCallback, updatePinMapCallback])

    const handleNameInput = (event) => { setName(event.target.value); }
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

    const handleStreetNum = (event) => { updateAddressCallback("streetNum", event.target.value); };
    const handleStreet = (event) => { updateAddressCallback("street", event.target.value); };
    const handleCity = (event) => { updateAddressCallback("city", event.target.value); };
    const handleLongitude = (event) => { updateCoordinatesCallback("lon", event.target.value); };
    const handleLatitude = (event) => { updateCoordinatesCallback("lat", event.target.value); };
    const handleCheckGMapsBtn = () => { openGMaps(address); };
    
    const submitButton = () => {
        const newEntry = {
            name: name,
            food: food,
            isVege: isVege,
            price: price,
            distance: distance,
            rate: rate,
            address: address,
            coordinates: coordinates
        }
        console.log(newEntry)
        handleSubmitEdittedSpot(newEntry);
    }

    return (
        <div className='module'>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input onChange={(event) => handleNameInput(event)} placeholder={name} /></td>
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
                            <td><input type='checkbox' onChange={() => handleIsVegeInput()} value={isVege} /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='range' min='5' max='100' onChange={(event) => handlePriceInput(event)} value={price} /></td>
                            <td>{price} €</td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><input type='range' min='0' max='30' onChange={(event) => handleDistanceInput(event)} value={distance} /></td>
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
                            <td><input onChange={(event) => handleStreetNum(event)} placeholder={address.streetNum} /></td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td><input onChange={(event) => handleStreet(event)} placeholder={address.street} /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input onChange={(event) => handleCity(event)} placeholder={address.city} /></td>
                        </tr>
                        <tr height='20'></tr>
                        <tr>
                            <td></td>
                            <td><button onClick={() => handleCheckGMapsBtn()}>Check coordinates</button> </td>
                        </tr>
                        <tr>
                            <td>Lon</td>
                            <td><input onChange={(event) => handleLongitude(event)} placeholder={coordinates.lon}/></td>
                        </tr>
                        <tr>
                            <td>Lat</td>
                            <td><input onChange={(event) => handleLatitude(event)} placeholder={coordinates.lat}/></td>
                        </tr>
                        <tr height='50'></tr>
                        <tr>
                            <td>
                                <button onClick={() => { submitButton() }}>Save !</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Map pinList={pinMap}/>
        </div>
    );
};

export default Editor;