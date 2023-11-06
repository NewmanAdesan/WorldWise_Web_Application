import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path='/' element={<Homepage />}/>
          <Route path='product' element={<Product />}/>
          <Route path='pricing' element={<Pricing />}/>
          <Route path='app' element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path='cities' element={<CityList />} />
            <Route path='countries' element={<CountryList />} />
          </Route>
          <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App