import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantTile = ({ spot }) => {

    const [spotInfos, setSpotInfos] = React.useState({});
    const [spotId, setSpotId] = React.useState({});

    React.useEffect(() => {
        if (spot !== undefined) {
            // console.log(spot)
            setSpotId(spot._id)
            const infos = spot.restaurant
            setSpotInfos(infos)
        }
    }, [spot]);

    return (
        <div className='tile'>
            <div className='tile-text'>
                <h3>{spotInfos.name} ({spotInfos.food})</h3>
            </div>
            <div className='tile-text'>
                <h3>{spotInfos.rate}</h3>
            </div>
            <div className='tile-text'>
                <Link to='/edit/spotId' state={{id: spotId, name: spotInfos.name}}>edit</Link>
            </div>
        </div>
    );
};

export default RestaurantTile;