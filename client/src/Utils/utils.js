export const buildAlertMsg = (newEntry, msg) => {
    var alertStr = "You're about to " + msg + " the entry!";
    alertStr += "\nname : " + newEntry.name;
    alertStr += "\nfood : " + newEntry.food;
    alertStr += "\nvege : " + newEntry.vege;
    alertStr += "\nprice : " + newEntry.price;
    alertStr += "\ndistance : " + newEntry.distance;
    alertStr += "\nrate : " + newEntry.rate;
    alertStr += "\naddress : " + newEntry.address.streetNum;
    alertStr += " " + newEntry.address.street;
    alertStr += ", " + newEntry.address.city;
    alertStr += "\n(" + newEntry.coordinates.lon;
    alertStr += " / " + newEntry.coordinates.lat + " )";
    return alertStr;
}

export const updateAddress = (item, value, address, setAddress) => {
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

export const updateCoordinates = (item, value, coordinates, setCoordinates) => {
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
        console.log(currentCoords)
        setCoordinates(currentCoords);
}

export const openGMaps = (address) => {
    const coma = '%2C';
    const space = '+';
    var urlReq = 'https://www.google.com/maps/search/?api=1&query=';
    urlReq += address.streetNum + coma;
    var splitStreet = address.street.split(" ");
    splitStreet.forEach(elem => {urlReq += elem + space;})
    urlReq += coma;
    var splitCity = address.city.split(" ");
    splitCity.forEach(elem => {urlReq += elem + space;})

    console.log(urlReq);
    window.open(urlReq, '_blank');
}