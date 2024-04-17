import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function UpdateProduct() {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [SKU, setSKU] = useState('')
    const [category, setCategory] = useState('')
    const [discount, setDiscount] = useState(0.0)
    
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    //read single product info
    const readInit = async() => {
        await axios.get(`/api/product/single/${params.id}`)
        .then( res =>{
            setTitle(res.data.product.title)
            setDesc(res.data.product.desc)
            setPrice(res.data.product.price)
            setCategory(res.data.product.category)
            setImage(res.data.product.image)
            setSKU(res.data.product.SKU)
            setDiscount(res.data.product.discount)
        }).catch(err => toast.error(err.response.data.msg))
        
    }

    //to uploadign image to server
    const imageHandler = async(e) => {
        e.preventDefault()
        try {
            let file = e.target.files[0]

            let formData = new FormData()
            formData.append('thumbnail', file)

            setLoading(true)
            await axios.post(`/api/file/upload/?product=${params.id}`, formData, {
                headers : {
                    'Content-Type':'multipart/form-data'
                }
            }).then( res => {
                setLoading(false)
                toast.success(res.data.msg)
                setImage(res.data.file)
                window.location.reload()
            }).catch( err => {
                toast.error(err.response.data.msg)
                setLoading(false)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

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
        readInit()
    }, [])

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            let data = {
                title,
                desc,
                category,
                price,
                SKU,
                discount,
                image
            }
            await axios.patch(`/api/product/update/${params.id}`, data)
            .then( res => {
                toast.success(res.data.msg)
                navigate(`/dashboard/superadmin/products`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteImage = async(e) => {   
        e.preventDefault()
        try {
            if(window.confirm(`Are you sure to delete the image ?`)){
                await axios.delete(`/api/file/delete?product=${params.id}`)
                .then( res => {
                    toast.success(res.data.msg)
                    setImage('')
                }).catch( err => {
                    toast.error(err.response.data.msg)
                })
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <h6 className="display-6 text-theme">Update Product</h6>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' required />
                </div>
                <div className='form-group mt-2'>
                    <label htmlFor="" >Product</label>
                    <br />
                    {
                        image === "" ? (
                                <label htmlFor='image'>
                                    {
                                        loading ? (
                                            <div className='spinner-border text-theme' style={{width: '4rem', height: '4rem'}} role={'status'}>
                                                <span className='visually-hidden'>Loading...</span>
                                            </div>
                                        ):(
                                            <input type="file" name='image' onChange={imageHandler} id='image' className='form-control' required />
                                        )
                                    }

                                </label>
                        ): (
                            <div className='card d-flex justify-content-center position-relative'>
                                <button onClick={deleteImage} className='btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle'>
                                    <i className='bi bi-x-circle'></i>
                                </button>
                                <img src={image ? `/uploads/${image}`: ''} alt="no pic"  className='card-img-top' style={{width:'45%'}}/>
                            </div>
                        )
                    }
                    
                </div>
            </div>
            <div className='col-md-6'>
                <div className='form-group mt-2'>
                    <label htmlFor="desc">Desciption</label>
                    <textarea name="desc" id="desc" cols="30" rows="5" value={desc} onChange={(e) => setDesc(e.target.value)} className='form-control' required></textarea>
                </div>
                <div className='form-group mt-2'>
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' id='price' value={price} onChange={(e) => setPrice(e.target.value)} className='form-control' required />
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor="SKU">SKU</label>
                    <input type="text" name='SKU' id='SKU' value={SKU} onChange={(e) => setSKU(e.target.value)} className='form-control' required />
                </div>

                <div className='form-group mt-2'>
                    <label htmlFor="category"Category>Category</label>
                    <select name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)} className='form-select'>
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
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name='discount' id='discount' value={discount} onChange={(e)=> setDiscount(e.target.value)} className='form-control' required />
                </div>
                
                <div className='form-group mt-2'>
                        <button onClick={submitHandler} className='btn btn-success'>Update Product</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default UpdateProduct