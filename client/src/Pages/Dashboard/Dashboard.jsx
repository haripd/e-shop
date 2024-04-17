import React from 'react'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='text-dark'> 
      <Outlet />
    </div>
  )
}

export default Dashboard