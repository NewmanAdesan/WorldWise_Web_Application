import React from 'react'
import { useState } from 'react'
import styles from './Map.module.css'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Map = () => {
  const [mapPosition, setMapPosition]= useState([40, 0]);

  return (
    <div className={styles.mapContainer}>
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors | Tiles courtesy of Humanitarian OpenStreetMap Team'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
    </div>
  )
}

export default Map