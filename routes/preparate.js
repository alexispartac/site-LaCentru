import express from 'express'; 
import {listaPreparate, adaugaPreparat, stergePreparat} from '../controllers/preparate.js'

const router = express.Router()           

// Lista de preparate
router.get( '/preparate-meniu' , listaPreparate);

router.post( '/adauga-preparat', adaugaPreparat);

router.delete( '/sterge-preparat', stergePreparat);


export default router;