import React from 'react'
import { useState } from 'react'
import styles from './Map.module.css'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useCitiesContext } from '../contexts/CitiesContext'

const Map = () => {
  const [mapPosition, setMapPosition]= useState([40, 0]);
  const {cities} = useCitiesContext(); 

  return (
    <div className={styles.mapContainer}>
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors | Tiles courtesy of Humanitarian OpenStreetMap Team'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.length!==0 && cities.map((city)=>{
            <Marker position={[city.position.lat, city.position.lng]}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
            
          })}
        </MapContainer>
    </div>
  )
}

export default Map