import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer} from 'react-leaflet';
import MarkerComponent from './MarkerComponent';
import styles from './CarMap.module.css';

const CarMap = ({ latitude, longitude }) => {
  return (
    <>  
      <h3 className={`${styles.carTitle} mb-4`}>Ubicación</h3>
      <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} className={styles.CarMapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerComponent 
            position={[latitude, longitude]}
        />
      </MapContainer>
    </>
  );
};

export default CarMap;