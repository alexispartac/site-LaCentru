import { useState, useEffect, createContext } from "react";
import Axios from 'axios'


export const CartContext = createContext();

export const CartProvider = ({childern}) => {
    const [cartItems, setCartItems] = useState([]);


    const getCartItems = async() => {
        const response = await Axios.get("http://localhost:8080/preparate/preparate-meniu");
        setCartItems(response.data.preparate)
    }

    useEffect(() => {
        getCartItems();
    }, []);


    if (!cartItems) {
    return <div>Cosul este gol---eroare la request</div>;
    }

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
            {childern}
        </CartContext.Provider>
    )

}
