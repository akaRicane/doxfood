import React from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

const Finder = () => {

    const [foundSpots, setFoundSpots] = React.useState([])

    const [foodChoice, setFoodChoice] = React.useState('false')
    const foodOptions = [
        { "label": " ", "value": "false" },
        { "label": "Microwave", "value": "Microwave" },
        { "label": "Italian", "value": "Italian" },
        { "label": "Brasserie", "value": "Brasserie" },
        { "label": "Burgers", "value": "Burgers" },
        { "label": "Japonese", "value": "Japonese" },
        { "label": "Chinese", "value": "Chinese" },
        { "label": "Thaï", "value": "Thaï" }
    ];

    const [priceChoice, setPriceChoice] = React.useState('false')
    const priceOptions = [
        { "label": " ", "value": "false" },
        { "label": "Cheap", "value": "cheap" }
    ];

    const [distanceChoice, setDistanceChoice] = React.useState('false')
    const distanceOptions = [
        { "label": " ", "value": "false" },
        { "label": "Close", "value": "close" }
    ];

    const handleFoodDP = (event) => { setFoodChoice(event.target.value); console.log("Food -> " + event.target.value); };
    const handlePriceDP = (event) => { setPriceChoice(event.target.value); console.log("Price -> " + event.target.value); };
    const handleDistanceDP = (event) => { setDistanceChoice(event.target.value); console.log("Distance -> " + event.target.value); };
    const handleFindBtn = () => { findSpots(); };

    const findSpots = () => {
        console.log('Query to find spots to server ...');
        axios.get('https://localhost:3001/find', { params: { "food": foodChoice, "price": priceChoice, "distance": distanceChoice } })
            .then(res => {
                const spotsList = res.data;
                if (spotsList.length === 0) {
                    alert("No spots found with queried params");
                }
                else {
                    console.log(spotsList);
                    setFoundSpots(spotsList);
                }
            })
            .catch(err => {
                console.log("... server request failed !");
                console.log(err);
            });

    };

    return (
        <div className='module'>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>Food</td>
                            <td>
                                <Dropdown
                                    label=""
                                    options={foodOptions}
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
                                    options={priceOptions}
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
                                    options={distanceOptions}
                                    value={distanceChoice}
                                    onChange={handleDistanceDP}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h3>Where to eat ?</h3>

                            </td>
                        </tr>
                <ul>
                    {
                        foundSpots.map(spot => {
                            return (
                                <li>{spot.name}</li>
                            )
                        })
                    }
                </ul>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => { handleFindBtn() }}>Find</button>
            </div>
        </div>
    );
};

export default Finder;