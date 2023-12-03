import React from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import { useCitiesContext } from '../contexts/CitiesContext';

const CountryList = () => {

  // consume the cities context
  const {cities} = useCitiesContext();
  console.log(cities);

  // extract distinct contries from list of cities information
  const countries = cities.reduce((acc, cur)=>{
    for (let city of acc){
      if (city.country === cur.country) return acc
    }
    acc.push(cur);
    return acc;
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country} /> )}
    </ul>
  )
}

export default CountryList