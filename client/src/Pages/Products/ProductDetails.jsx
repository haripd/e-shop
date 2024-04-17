import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../Hooks/authHook'
import useCart from '../../Hooks/cartHook'

function ProductDetails() {

    const [product, setProduct] = useState(false)
    const { contexToken } = useAuth();
    const { addCart } = useCart();

    const params = useParams() // to read the router param
    
    const readProduct = async () => {
        await axios.get(`/api/product/single/${params.id}`)
        .then( res => {
            console.log("Product details =",res.data.product)
            setProduct(res.data.product)
        }).catch ( err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readProduct()
    }, [])

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-6">
                    <div className="card">
                        {/* <img src={ product?.image ? product?.image?.path : `${process.env.PUBLIC_HOME}/${product?.image?.name}` } alt="no pic" className='card-img-top' /> */}

                        <img src={ product?.image ? `/uploads/${product?.image}`: ''} alt="no pic" className='card-img-top'/>
                    </div>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-6">
                <div className="card border-0">
                        <div className="card-body border-0">
                            <h3 className='display-3 text-theme'>{product?.title}</h3>
                            <h5 className='text-success float-end'>&#8377; {product?.price}</h5>
                            
                            <div className="card mt-5">
                                <div className='card-body'>
                                    <h4 className='text-theme'>Description</h4>
                                    <hr />
                                    <p className='text-secondary'>{ product?.desc }</p>
                                </div>
                            </div>
                            {
                                contexToken?.currentuser?.role === "superadmin" ? null : <button className='btn btn-success mt-5' onClick={() => addCart(product)}>Add to cart</button>
                            }
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails