import axios from 'axios'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export const Authcontext = createContext()

function AuthProvider(props) {
  //token
  const [token, setToken] = useState(false)
  //login status => if true, if logout = false
  const [login, setLogin] = useState(false)
  //login user info
  const [currentuser, setCurrentuser] = useState(false)

  useEffect(() => {
      if(token){
        axios.defaults.headers.common["Authorization"]=token
      }else {
        delete axios.defaults.headers.common["Authorization"]
      }
  }, [token])

  // const contextToken = useMemo() => ({}, [])
  const contextToken = useMemo(()=>({
    token,
    login,
    currentuser
  }), [token, login, currentuser])
  
  return (
    <Authcontext.Provider value={{contextToken, setToken, setLogin, setCurrentuser}}>
      {
        props.children
      }
    </Authcontext.Provider>
  )
}

export default AuthProvider