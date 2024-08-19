import { useContext } from "react";
import { CartContext } from "../context/ModuleContext";

export default function Cart() {
    const {cartItems, addCartItem, removeCartItem, clearCart, totalCart} = useContext(CartContext)

    return (
        <div className="cart">
            <h1 style={{width:'100%'}}>Comanda mea</h1>
            {   
                cartItems.length == 0 ? <p> Comanda ta este goala, trage o privire prin meniu!!</p>: 
                cartItems.map( item => 
                    <div style={{display:'flex', paddingTop:'10px'}}>
                        <img src={`${item.imagine}`} alt="CartItem" style={{width:'5%', height:'60px', marginTop:'auto', marginBottom:'auto', alignItems:'center'}}/>
                        <h4 style={{ width:'20%' , textTransform:'capitalize', fontSize:'20px', paddingLeft:'10px'}}>{item.denumire}</h4>
                        <h3> Pret: {item.pret} lei ...................</h3>
                        <div style={{width:'75%', height:'60px'}}>
                                <div style={{display:'flex', backgroundColor:'black', float:'right', position:'relative', top:'17px'}}>
                                        <button style={{ width:'30px', height:'30px'}} onClick={() => addCartItem(item)}> + </button>
                                </div>
                                <div style={{display:'flex', backgroundColor:'gray', opacity:'0.7', float:'right', position:'relative', top:'17px'}}>
                                        <p style={{ width:'30px', height:'30px', margin:'0', color:'black', padding:'5px', textAlign:'center'}}> {item.quantity} </p>
                                </div>
                                <div style={{display:'flex', backgroundColor:'black', float:'right', position:'relative', top:'17px'}}>
                                        <button style={{ width:'30px', height:'30px'}} onClick={() => removeCartItem(item)}> - </button>
                                </div>
                        </div>
                    </div>
                )
            }
            {cartItems.length == 0 ? '' : <button className="sterge-comanda"
                                                  onClick={() => clearCart()}
                                                  style={{left:'100px'}}  > Sterge toata comanda</button>}
            {cartItems.length == 0 ? '': <h2>Total de plata: {totalCart()} lei</h2>}

        </div>
    );

}