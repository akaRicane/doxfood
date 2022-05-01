import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { DEFAULT_PINMAP, DXOMARK_COORDINATES } from '../Constants/default';

const Map = ({ pinList }) => {

    const [pins, setPins] = React.useState([DEFAULT_PINMAP])

    React.useEffect(() => {
        if (typeof pinList === typeof {}) {
            if (Array.isArray(pinList)) {
                setPins(pinList);
            }
            else {
                setPins([pinList]);
            }
        }
        else {
            console.log("Can't display on map")
        }
    }, [pinList]);

    return (
        <div id='leaflet'>
            <MapContainer center={DXOMARK_COORDINATES} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={DXOMARK_COORDINATES}>
                    <Popup>
                        DXOMARK
                    </Popup>
                </Marker> */}
                <>
                    {
                        pins.map((pin, idx) => {
                            return (
                                <Marker key={'marker-' + idx} position={[pin.coordinates.lon, pin.coordinates.lat]}>
                                    <Popup>
                                        {pin.label}
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </>
            </MapContainer>
        </div>
    );
};

export default Map;