
import express from 'express'
import { verifyToken } from "../verifyToken.js";
import { CreatePole, delPole, editPole, getPole, getPoles, updatePole } from '../controllers/poleController.js';
const router = express.Router()
router.get('/pole/:id',getPole)
router.get('/poles',getPoles)
router.post('/createPole',verifyToken,CreatePole)
router.put('/editPole/:id',editPole)
router.delete('/delPole/:id',delPole)
router.put('/ansPole/:id',verifyToken,updatePole)


export default router
