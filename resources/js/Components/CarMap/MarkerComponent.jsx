import React, { useEffect } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import marker from '@images/marker-icon-2x.png';
import shadow from '@images/marker-shadow.png';

const customMarkerIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: shadow,
    shadowSize: [41, 41]
});

const MarkerComponent = ({ position, clientLogo }) => {

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
        <Marker position={position} icon={customMarkerIcon}>
            <Popup>
                <a href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`} target="_blank">
                    <img src={clientLogo} alt="Client Logo" width={100}/>
                </a>
            </Popup>
        </Marker>
    );
};

export default MarkerComponent;