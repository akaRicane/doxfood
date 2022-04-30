import React from 'react';
import Dropdown from './Dropdown';

const RestaurantEditor = ({ spot, handleSubmitEdittedSpot }) => {
    /* -------------------------------------------------------------------------- */
    /*                                   FIELDS                                   */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- name ---------------------------------- */
    const [nameInput, setNameInput] = React.useState(spot.name);
    /* -------------------------------- distance -------------------------------- */
    const [distance, setDistance] = React.useState(spot.distance);  // slider
    /* -------------------------------- food type ------------------------------- */
    const [food, setFood] = React.useState(spot.food);  // dropdown
    const foodOptions = [
        { "label": "Microwave", "value": "Microwave" },
        { "label": "Italian", "value": "Italian" },
        { "label": "Brasserie", "value": "Brasserie" },
        { "label": "Burgers", "value": "Burgers" },
        { "label": "Japonese", "value": "Japonese" },
        { "label": "Chinese", "value": "Chinese" },
        { "label": "Thaï", "value": "Thaï" },
    ];
    const [isVege, setIsVege] = React.useState(spot.isVege);  // dropdown t/f
    /* ---------------------------------- price --------------------------------- */
    const [price, setPrice] = React.useState(spot.price);  // slider
    /* --------------------------------- rating --------------------------------- */
    const [rate, setRate] = React.useState(spot.rate);  // slider
    const rateOptions = [
        { "label": "☆☆☆☆☆", "value": "☆☆☆☆☆" },
        { "label": "☆☆☆☆★", "value": "☆☆☆☆★" },
        { "label": "☆☆☆★★", "value": "☆☆☆★★" },
        { "label": "☆☆★★★", "value": "☆☆★★★" },
        { "label": "☆★★★★", "value": "☆★★★★" },
        { "label": "★★★★★", "value": "★★★★★" },
    ];
    /* --------------------------------- address -------------------------------- */
    const [address, setAddress] = React.useState({
        streetNum: "",
        street: "",
        city: ""
    });  // inputs
    
    const updateAddress = React.useCallback((item, value) => {
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

    React.useEffect(() => {
        if (spot.name !== undefined) {
            setNameInput(spot.name);
            setIsVege(Boolean(spot.isVege));
            setFood(spot.food);
            setPrice(spot.price);
            setDistance(spot.distance);
            setRate(spot.rate);
            updateAddress("streetNum", spot.address.streetNum);
            updateAddress("street", spot.address.street);
            updateAddress("city", spot.address.city);
        }
        // eslint-disable-next-line
    }, [spot, updateAddress])

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    const handleNameInput = (event) => { setNameInput(event.target.value); console.log("Name -> " + event.target.value); }
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
    const handleFoodDP = (event) => { setFood(event.target.value); console.log("Choice -> " + event.target.value); };
    const handlePriceInput = (event) => { setPrice(event.target.value); console.log("Price -> " + event.target.value); }
    const handleDistanceInput = (event) => { setDistance(event.target.value); console.log("Distance -> " + event.target.value); }
    const handleRateDP = (event) => { setRate(event.target.value); console.log("Choice -> " + event.target.value); };

    const handleStreetNum = (event) => { updateAddress("streetNum", event.target.value); };
    const handleStreet = (event) => { updateAddress("street", event.target.value); };
    const handleCity = (event) => { updateAddress("city", event.target.value); };

    const submitButton = () => {
        const newEntry = {
            name: nameInput,
            food: food,
            isVege: isVege,
            price: price,
            distance: distance,
            rate: rate,
            address: address
        }
        handleSubmitEdittedSpot(newEntry);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */
    return (
        <div className='module'>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input onChange={(event) => handleNameInput(event)} placeholder={nameInput}/></td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td>
                                <Dropdown
                                    label=" "
                                    options={foodOptions}
                                    value={food}
                                    onChange={handleFoodDP}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Vege</td>
                            <td><input type='checkbox' onChange={() => handleIsVegeInput()} value={isVege}/></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='range' min='5' max='100' onChange={(event) => handlePriceInput(event)} value={price}/></td>
                            <td>{price} €</td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><input type='range' min='0' max='30' onChange={(event) => handleDistanceInput(event)} value={distance}/></td>
                            <td>{distance} min</td>
                        </tr>
                        <tr>
                            <td>Rate</td>
                            <td>
                                <Dropdown
                                    label=" "
                                    options={rateOptions}
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
                    </tbody>
                </table>
            </div>
            <div className='col'>
                <table>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td><input onChange={(event) => handleStreetNum(event)} placeholder={address.streetNum}/></td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td><input onChange={(event) => handleStreet(event)} placeholder={address.street}/></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input onChange={(event) => handleCity(event)} placeholder={address.city}/></td>
                        </tr>
                        <tr>
                            <td>Map</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => {submitButton()}}>Save !</button>
            </div>
        </div>
    );
};

export default RestaurantEditor;