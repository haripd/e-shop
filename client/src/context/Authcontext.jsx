import axios from 'axios'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

//create context instance
export const Authcontext = createContext()

function AuthProvider(props) {
  //token
  //const [token, setToken] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"): false) //for dev only
  //login status => if true, if logout = false
  const [login, setLogin] = useState(false)
  //login user info
  const [currentuser, setCurrentuser] = useState(false)

  const verify = async(token) => {
    await axios.get(`/api/auth/verify/user`,{
      headers : {
        'Authorization': `${token}`
      }
    })
    .then(res =>{
      toast.success(res.data.msg)
      setCurrentuser(res.data.user)
      setLogin(true)
    }).catch(err => {
      toast.success(err.response.data.msg)
      setCurrentuser(false)
      setLogin(false)
      setToken(false)
      localStorage.removeItem("token")
    })
  }

  useEffect(() => {
      if(token){
        axios.defaults.headers.common["Authorization"]=token
        verify(token)
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
    <Authcontext.Provider value={{contextToken, setToken, setLogin, setCurrentuser, verify}}>
      {
        props.children
      }
    </Authcontext.Provider>
  )
}

export default AuthProvider