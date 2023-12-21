import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from './Map.module.css'

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useCitiesContext } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'
import useGeolocation from '../hooks/useGeolocation'
import Button from '../components/Button'
import useUrlPosition from '../hooks/useUrlPosition'

const Map = () => {
  const [mapPosition, setMapPosition]= useState([40, 40]);
  const {cities} = useCitiesContext(); 
  const [mapLat, mapLng] = useUrlPosition();
  const {isLoading: isGeolocationLoading, position: geolocationPosition, fetchLocation} = useGeolocation();
  const navigate = useNavigate();

  useEffect(
    ()=>{
      if (mapLat && mapLng && !isNaN(mapLat) && !isNaN(mapLng)) {
        setMapPosition([Number(mapLat), Number(mapLng)]);
      }
    }, [mapLat, mapLng]
  )

  useEffect (
    ()=>{
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        navigate(`form?lat=${geolocationPosition.lat}&lng=${geolocationPosition.lng}`);
      }
    }, [geolocationPosition, navigate]
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
        {!geolocationPosition && <Button type='position' handleClick={()=>fetchLocation()}>
            {isGeolocationLoading ? 'Loading...' : 'Use your Geolocation'}
        </Button>}
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
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  })
  return null;
}

export default Map;