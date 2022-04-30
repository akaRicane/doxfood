import React from 'react';
import Dropdown from './Dropdown';

const Create = ({ handleSubmitNewSpot }) => {

    const [address, setAddress] = React.useState({
        streetNum: "24",
        street: "Quai Alphonse Le Gallo",
        city: "Boulogne-Billancourt"
    });  // inputs

    /* -------------------------------------------------------------------------- */
    /*                                   FIELDS                                   */
    /* -------------------------------------------------------------------------- */
    /* ---------------------------------- name ---------------------------------- */
    const [nameInput, setNameInput] = React.useState("");
    /* -------------------------------- distance -------------------------------- */
    const [distance, setDistance] = React.useState("1 min");  // slider
    /* -------------------------------- food type ------------------------------- */
    const [food, setFood] = React.useState("Microwave");  // dropdown
    const foodOptions = [
        { "label": "Microwave", "value": "Microwave" },
        { "label": "Italian", "value": "Italian" },
        { "label": "Brasserie", "value": "Brasserie" },
        { "label": "Burgers", "value": "Burgers" },
        { "label": "Japonese", "value": "Japonese" },
        { "label": "Chinese", "value": "Chinese" },
        { "label": "Thaï", "value": "Thaï" },
    ];
    const [isVege, setIsVege] = React.useState(false);  // dropdown t/f
    /* ---------------------------------- price --------------------------------- */
    const [price, setPrice] = React.useState(10);  // slider
    /* --------------------------------- rating --------------------------------- */
    const [rate, setRate] = React.useState("☆☆☆☆☆");  // slider
    const rateOptions = [
        { "label": "☆☆☆☆☆", "value": "☆☆☆☆☆" },
        { "label": "☆☆☆☆★", "value": "☆☆☆☆★" },
        { "label": "☆☆☆★★", "value": "☆☆☆★★" },
        { "label": "☆☆★★★", "value": "☆☆★★★" },
        { "label": "☆★★★★", "value": "☆★★★★" },
        { "label": "★★★★★", "value": "★★★★★" },
    ];


    React.useEffect(() => {
    }, [])

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    const handleNameInput = (event) => { setNameInput(event.target.value); console.log("Name -> " + event.target.value); }
    const handleIsVegeInput = () => { setIsVege(!isVege); console.log("Vege -> " + !isVege); }
    const handleFoodDP = (event) => { setFood(event.target.value); console.log("Choice -> " + event.target.value); };
    const handlePriceInput = (event) => { setPrice(event.target.value); console.log("Price -> " + event.target.value); }
    const handleDistanceInput = (event) => { setDistance(event.target.value); console.log("Distance -> " + event.target.value); }
    const handleRateDP = (event) => { setRate(event.target.value); console.log("Choice -> " + event.target.value); };

    const handleStreetNum = (event) => { updateAddress("streetNum", event.target.value); };
    const handleStreet = (event) => { updateAddress("street", event.target.value); };
    const handleCity = (event) => { updateAddress("city", event.target.value); };

    const updateAddress = (item, value) => {
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
    }

    const submitButton = () => {
        const newEntry = {
            name: nameInput,
            food: food,
            vege: isVege,
            price: price,
            distance: distance,
            rate: rate,
            address: address
        }
        handleSubmitNewSpot(newEntry);
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
                            <td><input onChange={(event) => handleNameInput(event)} /></td>
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
                            <td><input type='checkbox' onChange={() => handleIsVegeInput()} /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='range' min='5' max='100' onChange={(event) => handlePriceInput(event)} /></td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td><input type='range' min='0' max='30' onChange={(event) => handleDistanceInput(event)} /></td>
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
                            <td><input onChange={(event) => handleStreetNum(event)} /></td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td><input onChange={(event) => handleStreet(event)} /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input onChange={(event) => handleCity(event)} /></td>
                        </tr>
                        <tr>
                            <td>Map</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => {submitButton()}}>Submit !</button>
            </div>
        </div>
    );
};

export default Create;