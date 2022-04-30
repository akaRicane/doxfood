import React from 'react';

const RestaurantTile = ({ spot }) => {

    const [spotInfos, setSpotInfos] = React.useState([]);

    React.useEffect(() => {
        if (spot !== undefined) {
            const infos = JSON.parse(spot.restaurant)
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
                <h3>edit</h3>
            </div>
        </div>
    );
};

export default RestaurantTile;