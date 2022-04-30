import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ address }) => {

    React.useEffect(() => {
        
    }, [address]);

    return (
        <div id='leaflet'>
            <MapContainer center={[48.833753, 2.227092]} zoom={16} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[48.833753, 2.227092]}>
                    <Popup>
                        DXOMARK
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;