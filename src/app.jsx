// intrebari
// react Router https://www.w3schools.com/react/react_router.asp
// ce este mai util, folosirea unei componente functionale sau de clasa
// cum pot optimiza codul din TableProducts, partea cu useState, pot folosi useContext?


// baza de date in mangoDb
import React from 'react';
import { useState } from 'react';
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx';
// nav component
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

    function Menu({setActiveMenu}){

        return (
            <ul className="menu" >
                <Text  onClick={() => setActiveMenu(0)} > Acasa </Text>
                <Text  onClick={() => setActiveMenu(1)} > Meniu </Text>
                <Text  onClick={() => setActiveMenu(2)} > Program </Text>
                <Text  onClick={() => setActiveMenu(3)} > Contact </Text>
                <Text  onClick={() => setActiveMenu(4)} > Comanda mea </Text>
            </ul>
        );
    }

    function ButtonMenu({className, onClick}){

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
        let [visible, setVisible] = useState(false)

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

// end nav component

// header
    function Header(){
        return (
            <img className="header-background" src="/public/imagini/background.jpg" />
        );
    }

// end header


// Content


    // UI Program

        function LinieOrar({zi, orar, color}){

            if(!color)
                color = 'black'

            return(
                <>
                    <li className={'linie-orar'}>
                        <h2 style={{float:'left', color:`${color}`}}> {zi} </h2>
                        <h2 style={{float:'right', textAlign:'right'} } > {orar} </h2>
                    </li>
                </>
            );

        }

        function InfoProgram(){
            
            return (
                <div className='continut'>
                    <h1> Program obisnuit </h1>
                    <ul className='lista-orar' >
                        <LinieOrar zi={'Luni'} orar={'09:00-23:00'}/>
                        <LinieOrar zi={'Marti'} orar={'09:00-23:00'}/>
                        <LinieOrar zi={'Miercuri'} orar={'09:00-23:00'}/>
                        <LinieOrar zi={'Joi'} orar={'09:00-23:00'}/>
                        <LinieOrar zi={'Vineri'} orar={'09:00-23:00'}/>
                        <LinieOrar zi={'Sambata'} orar={'12:00-23:00'} color={'red'}/>
                        <LinieOrar zi={'Duminica'} orar={'12:00-03:00'} color={'red'}/>
                    </ul >
                    <h1> Program Sarbatori </h1>
                    <ul className='lista-orar' >
                        <LinieOrar zi={'Luni'} orar={'12:00-20:00'}/>
                        <LinieOrar zi={'Marti'} orar={'12:00-20:00'}/>
                        <LinieOrar zi={'Miercuri'} orar={'12:00-20:00'}/>
                        <LinieOrar zi={'Joi'} orar={'12:00-20:00'}/>
                        <LinieOrar zi={'Vineri'} orar={'12:00-20:00'}/>
                        <LinieOrar zi={'Sambata'} orar={'12:00-19:00'} color={'red'}/>
                        <LinieOrar zi={'Duminica'} orar={'12:00-22:00'} color={'red'}/>
                    </ul>
                    <h1> Comenzile nu se preiau in afara programului!!!</h1>
                </div>
            );
        }

    // end UI Program

    //  UI Contact

        function InfoContact(){
            
            return (
                <div className='continut'>
                    <h1> Contact </h1>
                    <h3> Pentru comenzi telefonice sunati la numarul: 0739 941 614</h3>
                    
                </div>
            );
        }

    // end UI Contact

    function Acasa({className, active}){

        if(active === 0)
            return (
                <div className={className} >
                </div>
            );
    }

    function Meniu({className, active}){

        if(active === 1)
            return (
                <div className={className} >
                    <div className='continut'>
                        <Products/>
                    </div> 
                </div>
            );
    }

    function Program({className, active}){

        if(active === 2)
            return (
                <div className={className} >
                    <InfoProgram />
                </div>
            );
    }

    function Contact({className, active}){

        if(active === 3)
            return (
                <div className={className} >
                    <InfoContact />
                </div>
            );
    }

    function ComandaMea({className, active}){

        if(active === 4)
            return (
                <div className={className} >
                    <Cart/>
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
                <ComandaMea className="comanda-mea" active={activeMenu} />
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

// end content

// onSubmit ... IMPORTANT de studiat

export default function App (){
    return (  
        <Componente />
    );
}