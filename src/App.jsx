import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'

const BASE_URL = "http://localhost:9000"

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert("Error Occured When Fetching Cities Data.")
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, [])

  console.log(cities, isLoading);


  return (
    <BrowserRouter>
      <Routes>
          <Route index path='/' element={<Homepage />}/>
          <Route path='product' element={<Product />}/>
          <Route path='pricing' element={<Pricing />}/>
          <Route path='app' element={<AppLayout />}>
            <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path='countries' element={<CountryList />} />
          </Route>
          <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App