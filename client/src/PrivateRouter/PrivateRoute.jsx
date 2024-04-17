import React from 'react'
import { Outlet, Navigate, NavLink } from 'react-router-dom'
import { useAuth } from '../Hooks/authHook'

function PrivateRoute() {
    const {contextToken} = useAuth()

    //if token is present and login is true allow components to pass through <Outlet></Outlet>
    //or else redirect to login path
  return (
    <>
        {
         //contextToken?.token && contextToken?.login ? <Outlet /> : <Navigate to={`/login`} />
            contextToken?.token || contextToken?.login ? <Outlet /> : <Navigate to={`/login`} />
        }
    </>
  )
}

export default PrivateRoute