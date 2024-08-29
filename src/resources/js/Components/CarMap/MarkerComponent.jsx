import React, { useEffect } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';

const MarkerComponent = ({ position }) => {

    const map = useMap();

    useEffect(() => {
        if (map) {
            const marker = Object.values(map._layers).find((layer) => layer instanceof L.Marker);
            if (marker) {
                marker.openPopup();
            }
        }
    }, [map]);

    return (
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    );
};

export default MarkerComponent;