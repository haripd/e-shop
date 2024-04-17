import { createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "../Hooks/authHook";
import { toast } from "react-toastify";
import axios from "axios";

export const CartContext = createContext();

function CartProvider(props){

    const { currentuser } = useAuth()
    const [cart, setCart] = useState([]);

    const increment = useCallback((product)=>{
        console.log("Selected product =",product)
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart[index].quantity++
        setCart(newCart)
    },[cart])
    
    const decrement = useCallback((product) => {
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart[index].quantity--
        setCart(newCart)
    },[cart])

    const addCart = useCallback((product)=>{
            const newCart = [...cart]
            let data = { ...product, quantity: 1}
            newCart.push(data)
            setCart(newCart)
            toast.success('product added successfully')
    }, [cart]) 

    const removeCart = useCallback((product) =>{
        const newCart = [...cart]
        const index = newCart.findIndex(item=> item._id === product._id)
        newCart.splice(index, 1)
        setCart(newCart)
        toast.success(`Item is removed from cart`)
    }, [cart])

    const addNew = async() => {
        try {
            await axios.post(`/api/cart/add`, {cart})
            .then(res=>{
                toast.success(res.data.msg)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (error) {
            toast.error(error.message)
        }
    }
    //update
    const updateCart = async() => {
        try {
            // await axios.patch(`/api/cart/update/`)
        } catch (error) {
            toast.error(error.message)
        }

    }
    return(
        <CartContext.Provider value={{ cart, addCart, removeCart, increment, decrement}}>
            {
                props.children
            }
        </CartContext.Provider>
    )
}

export default CartProvider