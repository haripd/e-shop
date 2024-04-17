import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function NewProduct() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [SKU, setSKU] = useState('')
    const [category, setCategory] = useState('')
    const [discount, setDiscount] = useState(0.0)
   
    //read all categories
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    //read all categories
    const readAllCategories = async () => {
        try {
            await axios.get(`/api/category/all`)
            .then(res => {
            setCategories(res.data.categories)
        }).catch(err => toast.error(err.response.data.msg))
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        readAllCategories()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            
            let data = {
                title,
                desc,
                category,
                price
            }
            console.log(`product =`, data)
            await axios.post(`/api/product/add`, data)
            .then(res => {
                console.log("products = ", res.data.Product._id)
                toast.success(res.data.msg)
                navigate(`/dashboard/superadmin/products/update/${res.data.Product._id}`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <h6 className="display-6 text-theme">New Product</h6>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' required />
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor="desc">Desciption</label>
                    <textarea name="desc" id="desc" value={desc} onChange={(e)=> setDesc(e.target.value)} cols="30" rows="5" className='form-control' required></textarea>
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor="category"Category>Category</label>
                    <select name='category' id='category' value={category} onChange={(e)=> setCategory(e.target.value)} className='form-select'>
                        <option value="null">Choose Product Category</option>
                        {
                            categories && categories.map((item, index) => {
                                return (
                                    <option value={item.name}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' id='price' value={price} onChange={(e)=> setPrice(e.target.value)} className='form-control' required />
                </div>

                <div className='form-group mt-2'>
                        <button className='btn btn-success' onClick={submitHandler}>Add Product</button>
                </div>
                
            </div>
            
        </div>

    </div>
  )
}

export default NewProduct