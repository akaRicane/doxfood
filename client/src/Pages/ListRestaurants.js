import React from 'react';

import { AppContext } from '../App';
import Tile from '../Components/Tile.jsx'

import { requestRestaurantsList } from '../API/toServer';

const ListRestaurants = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
        requestRestaurantsList(context.setRestaurantsList);
        // eslint-disable-next-line
    }, [])

    return (
        <div className='list'>
            <h1 className='text'>Restaurants list</h1>
            <div>
            {
                context.restaurantsList.map((spot, idx) => {
                    return (
                        <Tile key={"tile-" + idx} spot={spot}/>
                    )
                })
            }
            </div>
        </div>
    );
};

export default ListRestaurants;