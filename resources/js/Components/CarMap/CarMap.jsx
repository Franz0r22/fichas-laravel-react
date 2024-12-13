import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer} from 'react-leaflet';
import MarkerComponent from './MarkerComponent';
import styles from './CarMap.module.css';

const CarMap = ({ latitude, longitude, clientLogo }) => {
  return (
    <>  
      <MapContainer center={[latitude, longitude]} zoom={15} scrollWheelZoom={false} className={styles.CarMapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerComponent 
            position={[latitude, longitude]}
            clientLogo={clientLogo}
        />
      </MapContainer>
    </>
  );
};

export default CarMap;