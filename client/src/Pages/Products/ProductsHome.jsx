import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductsHome() {
    const [products, setProducts] = useState([])

    const readProducts = async () => {
      try {
        await axios.get(`/api/product/all`)
        .then(res => {
          console.log("Data display =",res.data.products[0].image)
          setProducts(res.data.products)
        }).catch (err => toast.error(err.response.data.msg))
      } catch (error) {
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      readProducts()
    }, [])

  return (
    <div className='container'>
      <div className="row">
        {
          products && products.map((item, index) =>{
            console.log("data2 = ",`${process.env.PUBLIC_URL}/${item.image}`)
            return (
              <div className='col-md-3 col-lg-3 col-sm-6 rounded' key={index}>
                <NavLink to={`/products/${item._id}`} className="no-link">
                  <div className="card">
                    {/* <h2>{item.image}</h2> */}
                    {/* <img src={item.image ? item.image : `${process.env.PUBLIC_URL}/${item.image}`} alt="no pic" className='card-image-top'/> */}
                    <img src={item?.image ?`/uploads/${item?.image}`:''} alt="no pic" className='card-img-top' height={'300'}/>                   

                    <div className="card-body">
                      <h5 className='card-title'>{item.title}</h5>
                      <p className='card-text'> &#8377; {item.price}</p>
                    </div>
                  </div>

                </NavLink>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductsHome