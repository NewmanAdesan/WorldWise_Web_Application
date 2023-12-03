import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCitiesContext } from '../contexts/CitiesContext';
import styles from './CityItem.module.css'

const formatDate = (date) => new Intl.DateTimeFormat("en", {day:"numeric", month:"long", year:"numeric"}).format(new Date(date));

const CityItem = ({city}) => {
  // CONSUME THE CITIESCONTEXT
  const {currentCity} = useCitiesContext();

  return (
    <li>
      <NavLink className={`${styles.cityItem} ${city.id===currentCity.id ? styles['cityItem--active']: ""}`} to={`${city.id}`}>
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </NavLink>
    </li>
  )
}

export default CityItem