
// nav component

import { useState, useEffect } from 'react';

function Logo(){
    return (
        <img className="logo" src="/public/imagini/logo.jpg" alt="logo" />
    );
}

function Text({children, onClick}){
    return (
        <li onClick={onClick}>{children}</li>
    );
}

function Menu({activeMenu, setActiveMenu}){

    return (
        <ul className="menu" >
            <Text  onClick={() => setActiveMenu(0)} > Acasa </Text>
            <Text  onClick={() => setActiveMenu(1)} > Meniu </Text>
            <Text  onClick={() => setActiveMenu(2)} > Program </Text>
            <Text  onClick={() => setActiveMenu(3)} > Contact </Text>
            <Text  onClick={() => setActiveMenu(4)} > Despre </Text>
        </ul>
    );
}

function ButtonMenu({className, visible, onClick}){

    return (
        <img src="/public/imagini/menu.png" className={className}  onClick={onClick} />
    );
}

function MenuVertical({className, visible}){
    return (
        <ul className={`${className} ${visible ? "visible" : ''}`}>
            <br />
            <br />
            <h1> La Centru </h1>
            <Text> Noutati </Text>
            <Text> Promotii</Text>
            <Text> Cadouri </Text>
            <Text> Surprize </Text>
            <Text> Cont </Text>
        </ul>
    );
}

function Nav({activeMenu, setActiveMenu}){
    let [visible, setVisible] = useState(true)

    return (
        <div className="nav" >
            <Logo />
            <h1>La Centru</h1>
            <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <ButtonMenu className="button-menu" onClick={() => {setVisible(!visible)}}/>
            <MenuVertical className="menu-vertical" visible={visible}/>
        </div>
    );
}

// header
function Header(){
    return (
        <img className="header-background" src="/public/imagini/background.jpg" />
    );
}


// Content

function Preparat({preparat}){
    return (
        <div className='continer-prep'>
            <h2 style={{textAlign:"left"}}>{preparat.denumire.toUpperCase()}</h2>
            <img src={preparat.imagine} alt="img" style={{width:"100px", height:"100px"}}/>
            <h4>Cantitate: {preparat.cantitate}g</h4>
            <h4>Pret: {preparat.pret}</h4>
            <h4>Ingrediente:
                {preparat.ingrediente.map(ingredient => {
                    return (
                        <p className='val'>- {ingredient.denumire}: {ingredient.gramaj} g</p>
                    );
                })}
            </h4>
            <h4>Valori nutritionale per 100g
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
        </div>
    );
}

function Selectie({categorie}){

    return (
        <div id='cl'>
                    <input type="checkbox" id={categorie} name={categorie} />
                    <label style={{textTransform: 'capitalize'}} for={categorie}>{categorie}</label>
        </div>
    );
}

function SearchBar(){

    return (
        <div className='search-bar'>
            <fieldset>
                <legend style={{fontSize:'20px'}}>Selecteaza ce doresti sa comanzi </legend>
                <Selectie categorie="pizza" />
                <Selectie categorie="shaorma" />
                <Selectie categorie="alte specialitati" />
            </fieldset>

        </div>
    );
}

function InfoMeniu(){
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('/public/info.json')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    if (!data) {
      return <div>Loading...</div>;
    }

    const meniu = data.preparate.map(preparat => <Preparat preparat={preparat} />);   // map, nu forEach

    return (
       <div className='continut'>
            <h1>Meniu</h1>
            <SearchBar />
            {meniu}
       </div>
    );
}

function Meniu({className, active}){
    if(active === 1)
        return (
            <div className={className} >
                <InfoMeniu /> 
                
            </div>
        );
}

function Acasa({className, active}){

    if(active === 0)
        return (
            <div className={className} >
            </div>
        );
}

function Program({className, active}){

    if(active === 2)
        return (
            <div className={className} >
            </div>
        );
}

function Contact({className, active}){

    if(active === 3)
        return (
            <div className={className} >
            </div>
        );
}

function Despre({className, active}){

    if(active === 4)
        return (
            <div className={className} >
            </div>
        );
}

//  Continer

function Continer({activeMenu}){
    return (    
        <div className="continer">
            <Acasa className= "acasa" active={activeMenu} />
            <Meniu className="meniu" active={activeMenu} />
            <Program className="program" active={activeMenu} />
            <Contact className="contact" active={activeMenu} />
            <Despre className="despre" active={activeMenu} />
        </div>
    );
}

// Toate componentele

function Componente(){

// starea din componenta menu care se gaseste in nav am nevoie de ea in continer
    let [activeMenu, setActiveMenu] = useState(0);

    return (  
        <div>
            <Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <Header />
            <Continer activeMenu={activeMenu}  />
        </div>
    );
}

// onSubmit ... IMPORTANT de studiat

export default function App (){
    return (  
        <Componente />
    );
}