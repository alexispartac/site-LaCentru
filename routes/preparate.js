import express from 'express'; 
import {listaPreparate, adaugaPreparat, stergePreparat} from '../controllers/preparate.js'
//import {adaugaLaComanda, listaPreparateComanda, stergeDinComanda} from '../controllers/preparate.js'
const router = express.Router()           

// Lista de preparate
router.get( '/preparate-meniu' , listaPreparate);

router.post( '/adauga-preparat', adaugaPreparat);

router.delete( '/sterge-preparat', stergePreparat);


// router.get( '/preparate-comanda', listaPreparateComanda);

// router.patch( '/adauga-la-comanda', adaugaLaComanda);

// router.patch( '/sterge-din-comanda', stergeDinComanda)

export default router;