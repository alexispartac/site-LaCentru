// baza de date in mangoDb
import { useState, useEffect } from 'react';

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

// end nav component

// header
    function Header(){
        return (
            <img className="header-background" src="/public/imagini/background.jpg" />
        );
    }

// end header


// Content

    // UI Acasa

    // end UI Acasa

    // UI Meniu
        function Preparat({preparat}){
            const [count, setCount] = useState(0);

            return (
                <div className='continer-prep' key={preparat.id}>
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
                        <button type="submit" key={preparat.id} onClick={() => setCount(count + 1)}>
                            {/* {cantitate adaugata la comanda} */}
                            Adauga la comanda
                        </button>
                        <div className={ count !== 0 ? 'numaratoare ' : ''} key={preparat.id} onClick={() => setCount(count-1)}>
                            { count ? <h3 > x{ count }</h3> : null}
                        </div>
                    </div>
                </div>
            );
        }

        function TableProducts({check1, check2, check3}){
            const [data, setData] = useState(null);
            let meniu = [];

            useEffect(() => {
                fetch('/public/info.json')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
            }, []);

            if (!data) {
            return <div>Loading...</div>;
            }

            
            if( !check1 )
                ;
            else  {
                data.preparate.map(preparat => preparat.categorie === 'pizza' ? meniu.push(<Preparat key={preparat.denumire} preparat={preparat} />) : null )
            }
            
            if( !check2 )
                ;
            else  { 
                data.preparate.map(preparat => preparat.categorie === 'shaorma' ?  meniu.push(<Preparat key={preparat.denumire} preparat={preparat} />) : null )
            }


            return ( 
                <div className='continut' style={{margin:'0px'}}>
                    {
                        meniu.length !== 0 ? meniu : 
                        <h1 > Selecteaza o categorie!</h1>
                    }
                </div>
            );
        }

        function Selectie({categorie, check, setCheck}){

            return (                               // e bine ca inputul sa fie intr un label dar se poate folosi si htmlFor
                <div id='cl'>
                    <input type="checkbox" id={categorie} name={categorie} defaultChecked={true} value={check} onChange={() => setCheck(!check)}/>           
                    <label style={{textTransform: 'capitalize'}} htmlFor={categorie}>{categorie}</label>
                </div>
            );
        }

        function CheckBox({check1, setCheck1, check2, setCheck2, check3, setCheck3}){

            return (
                <div className='search-bar'>
                    <fieldset>
                        <legend style={{fontSize:'20px'}}>Selecteaza ce doresti sa comanzi </legend>
                        <Selectie key='pizza' categorie="pizza" check={check1} setCheck={setCheck1} />
                        <Selectie key='shaorma' categorie="shaorma" check={check2} setCheck={setCheck2} />
                        <Selectie key='altele' categorie="altele" check={check3} setCheck={setCheck3} />
                    </fieldset>
                </div>
            );
        }

        function PreparatComanda({preparat}){
            return (
                <div style={{display:'block', padding:'10px', borderBottom:'1px solid black'}} className='preparat-comanda' key={preparat.id}>
                    <h4 style={{width:'25%', margin:'0', display:'inline'}}> {preparat.denumire.toUpperCase()} </h4>
                    <h3 style={{width:'50px', margin:'0', display:'inline', float:'right'}}> x{preparat.cantitiateComanda} </h3>
                </div>
            );
        }

        function Comanda(){
            const [data, setData] = useState(null);
            const [afiareComanda, setAfisareComanda] = useState(false);
            let comanda = [];

            useEffect(() => {
                fetch('/public/info.json')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
            }, []);

            if (!data) {
            return <div>Loading...</div>;
            }

            data.preparate.map( preparat => preparat.comanda === true ? comanda.push(<PreparatComanda preparat={preparat}/>) : null)

            return (
                <div style={{width:'100%', display:'flex' }}>
                        <button className='button-comanda' 
                                onClick={() => setAfisareComanda(!afiareComanda)}>
                            Comanda mea 
                        </button>
                    <div className={`comanda ${ afiareComanda ? 'visible' : ''}`} >
                        <fieldset style={{width:'100%', display:'inline-block', margin:'20px', height:'500px'}}>
                            <legend style={{fontSize:'20px'}}>Comanda mea</legend>
                            { comanda.length > 0 ? 
                                <div>
                                    <h4>
                                        {comanda}
                                    </h4>
                                    <h3>Total de plata: ...</h3>
                                    <button className={`button-finalizare ${ afiareComanda ? 'visible' : ''}`}> Plateste </button>
                                </div> 
                                : 
                                <div>
                                    <h3>
                                        Comanda ta este goala!
                                    </h3>
                                </div>
                            }
                        </fieldset >
                    </div>

                </div>
            );

        }

        function InfoMeniu(){
            const [check1, setCheck1] = useState(true);
            const [check2, setCheck2] = useState(true);
            const [check3, setCheck3] = useState(true);

                
            return (
            <div className='continut'>
                    <h1>Meniu</h1>
                    {/* Selectare afisare produse */}
                    <CheckBox 
                        check1={check1} setCheck1={setCheck1}
                        check2={check2} setCheck2={setCheck2}
                        check3={check3} setCheck3={setCheck3}
                    />
                    {/* Tabelul vu produse dupa interogare */}
                    <TableProducts 
                        check1={check1}
                        check2={check2}
                        check3={check3}
                    />
                    {/* Comanda finala */}
                    <Comanda />
            </div>
            );
        }
    // end UI Meniu

    // UI Program

        function LinieOrar({zi, orar, color}){

            if(!color)
                color = 'black'

            return(
                <>
                    <li className={'linie-orar'} key={zi}>
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
                    </ul>
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
                    <h3> Pntru comenzi telefonice sunati la numarul: 0739 941 614</h3>
                    
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
                    <InfoMeniu /> 
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

// end content

// onSubmit ... IMPORTANT de studiat

export default function App (){
    return (  
        <Componente />
    );
}