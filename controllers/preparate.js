import mongodb, { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("public").collection("preparate");

export const listOfPrep = async(req, res) => {
    try{
       
        const preparate = await col.find({}).maxTimeMS(50).toArray((err, data) => {
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