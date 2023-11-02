import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='product' element={<Product />}/>
          <Route path='pricing' element={<Pricing />}/>
          <Route path='app' element={<AppLayout />}/>
          <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App