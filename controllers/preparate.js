import mongodb, { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("public").collection("preparate");
const { ObjectId } = mongodb;


// Meniu -admin permission*****************************************************************************************************

    export const listaPreparate = async(req, res) => {
        res.set('Access-Control-Allow-Origin', '*');  // rezolva eroare CORS

        try{
        
            const preparate = await col.find({}).toArray((err, data) => {
                if (err) {
                    res.status(400).json({error: 'Ceva nu a mers bine!'})
                }
                return res.json(data);
            });

            res.send({preparate})
        }catch(error){
            res.status(400).json({error: 'Ceva nu a mers bine!'})
        }
    };

    export const adaugaPreparat = async(req, res) => {

        const preparatNou = req.body;
    
        try{
    
            await col.insertOne(new Object(req.body));
    
            res.send(preparatNou);
    
        }catch(error){
            res.status(405).json({error: "Ceva nu a mers bine!"})
        }
    
    }
    
    export const stergePreparat = async(req, res) => {
    
        try{
            
            await col.deleteOne({_id : new ObjectId(`${req.headers._id}`)});
    
            res.send({message: 'Preparatul a fost sters cu succes!'})
    
        }catch(error){
            res.status(405).json({message: 'Ceva nu a mers bine!'})
            console.log(error)
        }
    
    } 

// ***********************************************************************************************************


// Comanda user-permission*****************************************************************************************************

// export const listaPreparateComanda = async(req, res) => {
//     res.set('Access-Control-Allow-Origin', '*');

//     try {
//         const preparateComanda = await col.find({cantitiateComanda: { $gte: 1}}).toArray((err, data) => {
//             if (err) {
//                 res.status(400).json({error: 'Ceva nu a mers bine!'})
//             }
//             return res.json(data);
//         });

//         res.send({preparateComanda})
//         console.log(preparateComanda)
//     }catch(error){
//         res.status(400).json({error: 'Ceva nu a mers bine!'})
//     }

// }



// export const adaugaLaComanda = async(req, res) => {
//     res.set('Access-Control-Allow-Origin', '*'); 

//     try{
       
//         await col.updateOne(
//             {_id : new ObjectId(`${req.headers._id}`)}, 
//             {$inc: {cantitiateComanda: 1}},
//             {upsert: true}
//         )

//         res.status(200).json({message: `Adaugata cu succes!`})
//     }catch(error){
//         res.status(400).json({error: 'Ceva nu a mers bine!'})
//         console.log(error)
//     }

// }

// export const stergeDinComanda = async(req, res) => {
//     res.set('Access-Control-Allow-Origin', '*'); 

//     try{
       
//         await col.updateOne(
//             {_id : new ObjectId(`${req.headers._id}`)}, 
//             { $inc: {cantitiateComanda: -1}},
//             {upsert: true}
//         )

//     }catch(error){
//         res.status(405).json({message: "Ceva nu a mers bine!"})
//     }

// }


// ***************************************************************************************************************