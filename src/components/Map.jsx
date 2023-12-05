import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from './Map.module.css'

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useCitiesContext } from '../contexts/CitiesContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Map = () => {
  const [mapPosition, setMapPosition]= useState([40, 40]);
  const {cities} = useCitiesContext(); 
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(
    ()=>{
      if (mapLat && mapLng && !isNaN(mapLat) && !isNaN(mapLng)) {
        setMapPosition([Number(mapLat), Number(mapLng)]);
      }
    }, [mapLat, mapLng]
  )

  return (
    <div className={styles.mapContainer}>
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors | Tiles courtesy of Humanitarian OpenStreetMap Team'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.length!==0 && cities.map((city)=>(
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          <Marker position={[40, 40]}>
            <Popup>
              this is a sample pop up
            </Popup>
          </Marker>
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
    </div>
  )
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lat}`);
    }
  })
  return null;
}

export default Map