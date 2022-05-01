import axios from "axios";

export const addNewSpot = (newEntry) => {
    console.log('Query to add entry to server ...');
    axios.get('http://localhost:3001/create', { params: { "spot": newEntry } })
        .then(res => {
            console.log("Added to database: " + res.data);
        })
        .catch(err => {
            console.log("... server request failed !");
            console.log(err);
        });
};

export const findSpots = (foodChoice, priceChoice, distanceChoice, setFoundSpots) => {
    console.log('Query to find spots to server ...');
    axios.get('http://localhost:3001/find', { params: { "food": foodChoice, "price": priceChoice, "distance": distanceChoice } })
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

export const fetchSpotInfos = (spotId, setSpot) => {
    console.log('Query to fetch restaurant infos to server ...');
    axios.get('http://localhost:3001/fetch', { params: { "id": spotId } })
        .then(res => {
            console.log("Fetch restaurant: " + res.data.restaurant.name);
            setSpot(res.data.restaurant);
        })
        .catch(err => {
            console.log("... server request failed !");
            console.log(err);
        });

};

export const editSpotInfos = (spotId, newEntry) => {
    console.log('Query to edit restaurant infos to server ...');
    axios.get('http://localhost:3001/edit', { params: { "id": spotId, "spot": newEntry } })
        .then(res => {
            console.log("Editted restaurant: " + res.data);
        })
        .catch(err => {
            console.log("... server request failed !");
            console.log(err);
        });
};

export const requestRestaurantsList = (setRestaurantsList) => {
    console.log('Request restaurants list to server ...');
    axios.get('http://localhost:3001/list')
    .then(res => {
        setRestaurantsList(res.data.list);
        console.log("restaurants list is loaded ! (found " + res.data.list.length + ")");
    })
    .catch(err => {
        console.log("... server request failed !");
        console.log(err);
    });
};