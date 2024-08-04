// Content


async function Acasa({className, active}){
    return (
        <div className={`${className} ${active ? "active" : ""}`} >
        </div>
    );
}

function Meniu({className, active}){
    return (
        <div className={`${className} ${active ? "active" : ""}`} >

        </div>
    );
}

function Program({className, active}){
    return (
        <div className={`${className} ${active ? "active" : ""}`}>

        </div>
    );
}

function Contact({className, active}){
    return (
        <div className={`${className} ${active ? "active" : ""}`}>

        </div>
    );
}

function Despre({className, active}){
    return (
        <div className={`${className} ${active ? "active" : ""}`}>

        </div>
    );
}


export default{
    Acasa, Meniu, Program, Contact, Despre
}