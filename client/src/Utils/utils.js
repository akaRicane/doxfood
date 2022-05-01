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