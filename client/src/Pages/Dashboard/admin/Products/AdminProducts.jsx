import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminProducts() {

  const [products, setProducts] = useState([])

  const readAllProducts = async() => {
    await axios.get(`/api/product/all`)
    .then(res => {
      setProducts(res.data.products)
    }).catch(err => toast.error(err.response.data.msg))
  }

  useEffect(()=>{
    readAllProducts()
  }, [])

  return (
    <div className='container'> 
      <div className="row">
        <div className="col-md-12">
          <div className="table table-responsive">
            <table className='table table-bordered table-striped table-hovered'>
              <thead>
                <tr>
                  <th colSpan={6}>
                    <NavLink to={`new`} className="btn btn-dark">
                      <i className='bi bi-plus-circle'></i>Add Product
                    </NavLink>
                  </th>
                </tr>
                <tr className='text-center'>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>SKU</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  products && products.map((item, index) => {
                      return (
                        <tr className='text-center' key={index}>
                            <td> {item.title} </td>
                            <td> 
                              {/* <img src={item?.image.path} alt="" width={100} height={100} className='img-fluid' /> */}
                              <img src={`/uploads/${item?.image}`} alt="no pic" width={100} height={100} className='img-fluid' />
                            </td> 
                            <td> {item.price} </td>
                            <td> {item.category} </td>
                            <td> {item.SKU} </td>
                            <td>
                              <NavLink to={`update/${item._id}`} className="btn btn-sm btn-info me-3" >
                                  <i className='bi bi-pencil'></i>
                              </NavLink>
                              <button className='btn btn-sm btn-danger'>
                                <i className='bi bi-trash'></i>
                              </button>
                            </td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts