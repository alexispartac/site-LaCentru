import express from 'express'; 
import {listOfPrep} from '../controllers/preparate.js'

const router = express.Router()           

// Lista de preparate
router.get( '/' , listOfPrep);

export default router;