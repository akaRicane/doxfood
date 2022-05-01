import React from 'react';

import Dropdown from './Dropdown';
import Map from '../API/Map';

import { findSpots } from '../API/toServer';

import { OPTIONS_FOOD, OPTIONS_PRICE, OPTIONS_DISTANCE } from '../Constants/constants';
import { DEFAULT_FOOD_CHOICE, DEFAULT_PRICE_CHOICE, DEFAULT_DISTANCE_CHOICE, DEFAULT_PINMAP } from '../Constants/default';

const Finder = () => {

    const [foundSpots, setFoundSpots] = React.useState([]);
    const [foodChoice, setFoodChoice] = React.useState(DEFAULT_FOOD_CHOICE);
    const [priceChoice, setPriceChoice] = React.useState(DEFAULT_PRICE_CHOICE);
    const [distanceChoice, setDistanceChoice] = React.useState(DEFAULT_DISTANCE_CHOICE);
    const [pinList, setPinList] = React.useState(DEFAULT_PINMAP);

    React.useEffect(() => {
        if (foundSpots.length > 0) {
            var pinBuffer = [];
            foundSpots.forEach(spot => {
                var pin = {
                    label: spot.name,
                    coordinates: spot.coordinates
                }
                pinBuffer.push(pin);
            })
            setPinList(pinBuffer);
        }
        // else {
        //     setPinList(DEFAULT_PINMAP);
        // }
    }, [foundSpots])

    const handleFoodDP = (event) => { setFoodChoice(event.target.value); };
    const handlePriceDP = (event) => { setPriceChoice(event.target.value); };
    const handleDistanceDP = (event) => { setDistanceChoice(event.target.value); };
    const handleFindBtn = () => { findSpots(foodChoice, priceChoice, distanceChoice, setFoundSpots); };

    return (
        <div className='module'>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h3>Where to eat ?</h3>
                            </td>
                            <td>
                                <button onClick={() => { handleFindBtn() }}>Find</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td>
                                <Dropdown
                                    label=""
                                    options={OPTIONS_FOOD}
                                    value={foodChoice}
                                    onChange={handleFoodDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>
                                <Dropdown
                                    label=""
                                    options={OPTIONS_PRICE}
                                    value={priceChoice}
                                    onChange={handlePriceDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td>
                                <Dropdown
                                    label=""
                                    options={OPTIONS_DISTANCE}
                                    value={distanceChoice}
                                    onChange={handleDistanceDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><h3 className='text'>Results</h3></td>
                        </tr>
                            {
                                foundSpots.map((spot, idx) => {
                                    return (
                                        <tr key={'finder-results-' + idx}><td key={'finder-results-cell' + idx}>{spot.name}</td></tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
            <Map pinList={pinList}/>
        </div>
    );
};

export default Finder;