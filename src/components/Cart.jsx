import { useContext } from "react";
import { CartContext } from "../context/ModuleContext";

export default function Cart() {
    const {cartItems, addCartItem, removeCartItem, clearCart, totalCart} = useContext(CartContext)

    return (
        <div className="cart">
            <h1>Comanda mea</h1>
            {

            }
        </div>
    );

}