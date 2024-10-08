import { useState, useEffect, createContext} from "react";
import Axios from 'axios'
import { CartContext } from "./ModuleContext";

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    // const getCartItems = async() => {
    //     const response = await Axios.get("http://localhost:8080/preparate/preparate-meniu");
    //     const data = response.data;
    //     setCartItems(data.preparate)
    // }

    // useEffect(() => {
    //     getCartItems();
    // }, []);




    const addCartItem = (item) => {
        const isItemsInCart = cartItems.find( cartItem => cartItem._id === item._id);
        
        if(isItemsInCart)
            setCartItems(
                cartItems.map( cartItem => cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                )
            )
        else
            setCartItems(
            [...cartItems, {...item, quantity: 1}])

    }

    const removeCartItem = (item) => {
        const isItemsInCart = cartItems.find( cartItem => 
            cartItem._id === item._id
        )

        if(isItemsInCart.quantity !== 1)
            setCartItems(
                cartItems.map( cartItem => 
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity-1} : cartItem
                )
            )
        else
            setCartItems(
                cartItems.filter( cartItem => cartItem._id !== item._id)
            )
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const totalCart = () =>
    {
        return cartItems.reduce( (total, item) => total + item.pret * item.quantity, 0)
    }

    return (
        <CartContext.Provider
        value={
            {
            cartItems,        
            addCartItem,
            removeCartItem,
            clearCart,
            totalCart
            }
        }>
            {children}
        </CartContext.Provider>
    )

}


