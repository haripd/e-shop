import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  return (
    <div className='container mt-5 p-5'>
      <Outlet />
    </div>
  )
}

export default Home