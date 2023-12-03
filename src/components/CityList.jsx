import React from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Message from './Message'
import Spinner from './Spinner'
import { useCitiesContext } from '../contexts/CitiesContext'

function CityList () {

  // consume the cities context
  const {cities, isLoading} = useCitiesContext();

  // what to display while city is being fetched
  if (isLoading) return <Spinner />

  // what to display if there is no city in database
  if (cities.length === 0) return <Message message="Add Your First City by Clicking on a City on the Map" />

  // what to display if there is at least a city in database
  return (
    <ul className={styles.cityList}>
      {cities.map((city)=>{
        return <CityItem city={city} key={city.id} />
      })}
    </ul>
  )
}

export default CityList;
