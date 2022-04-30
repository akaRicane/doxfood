import React from 'react';
import axios from 'axios';

import { AppContext } from '../App';
import RestaurantTile from '../Components/RestaurantTile.jsx'

const ListRestaurants = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
        requestRestaurantsList();
        // eslint-disable-next-line
    }, [])

    const requestRestaurantsList = () => {
        console.log('Request restaurants list to server ...');
        axios.get('https://localhost:3001/list')
        .then(res => {
            context.setRestaurantsList(res.data.list);
            console.log("restaurants list is loaded ! (found " + res.data.list.length + ")");
        })
        .catch(err => {
            console.log("... server request failed !");
            console.log(err);
        });
    }
    

    return (
        <div className='list'>
            <h1 className='text'>Restaurants Page</h1>
            <div>
            {
                context.restaurantsList.map((spot, idx) => {
                    return (
                        <RestaurantTile key={"tile-" + idx} spot={spot}/>
                    )
                })
            }
            </div>
            <h3 className='text'>{context.restaurantsList.length} restaurants in dB !</h3>
        </div>
    );
};

export default ListRestaurants;