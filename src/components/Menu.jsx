import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/authHook'
import { toast } from 'react-toastify'
import axios from 'axios'

const Menu = () => {
  const { contextToken, setToken, setCurrentuser, setLogin } = useAuth()
  const navigate = useNavigate()

  const logout = async() => {
    if(window.confirm(`Are you sure to logout`)){
      // toast.success('logout successfully')
      axios.get(`/api/auth/logout`)
      .then(res => {
        toast.success(res.data.msg)
        navigate(`/login`)
        setToken(false)
        setCurrentuser(false)
        setLogin(false)
      }).catch(err => toast.error(err.response.data.msg))
    }else{
      toast.warning('logout terminated')
    }
  }
  return (
    <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-theme">
          <div className='container'>
              <NavLink to={`/`} className="navbar-brand">MERN-Project</NavLink>
              <button className='btn btn-warning' data-bs-target='#menu'
              data-bs-toggle="offcanvas">
                <i className='bi bi-list'></i>
              </button>
          </div>
        </nav>

        {/* //offcanvas menu */}
        <div className='offcanvas offcanvas-end' tabIndex={'-1'} id='menu'>
            <div className='offcanvas-header'>
                <h6 className='text-dark display-6 offcanvas-title'>MERN-Project</h6>
                <button data-bs-dismiss='offcanvas' className='btn-close'></button>
            </div>
            <div className='offcanvas-body'>
                <div className='list-group text-center mt-2 mb-2'>
                    <NavLink to={`/`} className="list-group-item">Home</NavLink>
                    <NavLink to={`/about`} className="list-group-item">About</NavLink>
                    <NavLink to={`/contact`} className="list-group-item">Contact</NavLink>
                </div>
                {
                  contextToken?.token && contextToken?.login ? (
                    <div className='list-group text-center mt-2'>
                    <NavLink to={`/dashboard`} className="list-group-item">Dashboard</NavLink>
                   <button onClick={logout} className='btn btn-danger mt-2'>Logout</button>
                </div>
                  ):(
                    <div className='list-group text-center mt-2'>
                    <NavLink to={`/login`} className="list-group-item">Login</NavLink>
                    <NavLink to={`/register`} className="list-group-item">Register</NavLink>
                </div>
                  )
                }
            </div>
        </div>
    </header>
  )
}

export default Menu