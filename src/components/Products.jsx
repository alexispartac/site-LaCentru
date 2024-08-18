import Axios from 'axios'
import { useEffect, useState } from 'react';


export default function Products(){
    const [data, setData] = useState(null);
    let meniu = [];

    const getData = async() => {
        const res = await Axios.get("http://localhost:8080/preparate/preparate-meniu");
        setData(res.data);
    }

    useEffect(() => {
        getData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }else
        meniu = data;

    return (
        meniu.preparate.map(preparat => 
        <div className='continer-prep' key={preparat._id}>
            <h2 style={{textAlign:"left"}}>{preparat.denumire.toUpperCase()}</h2>
            <img src={preparat.imagine} alt="img" style={{width:"100px", height:"100px"}}/>
            <h4>Cantitate: {preparat.cantitate}g</h4>
            <h4 style={{color:'rgba(166, 98, 6, 0.842)', fontSize:'22px'}}>Pret: {preparat.pret + ' lei'}</h4>
            <h4 className='restrans'>Ingrediente:            {/* restrangere */}
                {preparat.ingrediente.map(ingredient => {
                    return (
                        <p className='val'>- {ingredient.denumire}: {ingredient.gramaj} g</p>
                    );
                })}
            </h4>
            <h4 className='restrans'>Valori nutritionale per 100g:  {/* restrangere */}
                {preparat.val_nut.map(ingredient => {
                    return (
                        <div className='val'>
                            <p>- valoare energetica: {ingredient.valoare_energetica} g</p>
                            <p>- grasimi: {ingredient.grasimi} g</p>
                            <p>- acizi grasi saturati: {ingredient.acizi_grasi_saturati} g</p>
                            <p>- glucide: {ingredient.glucide} g</p>
                            <p>- zaharuri: {ingredient.zaharuri} g</p>
                            <p>- proteine: {ingredient.proteine} g</p>
                            <p>- sare: {ingredient.grasimi} g</p>
                        </div>
                    );
                })}
            </h4>
            <div className='submit-info'>
                <button>
                    Adauga la comanda
                </button>
            </div>
        </div>
        )
    );
    
}