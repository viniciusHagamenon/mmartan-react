import React from 'react'
import './App.scss'

import Header from './shared/Header'
import ProductsList from './ProductsList'

import ProductsStore from '../stores/ProductsStore'

const productsStore = new ProductsStore()

const App = () => (
  <div className="app">
    <Header productsStore={productsStore} />
    <ProductsList productsStore={productsStore} />
  </div>
)

export default App
