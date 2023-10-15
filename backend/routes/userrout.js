
import express from 'express'
import {signIn,signUp} from '../controllers/userController.js';
import { verifyToken } from "../verifyToken.js";
import {subscribe,unsubscribe,getUser, updateUser, like, dislike, subChannels, searchChannel, getUsers} from '../controllers/usersController.js'
const router = express.Router()
router.post('/register',signUp)
router.post('/login',signIn)
router.get('/users',getUsers)
router.get('/:id',getUser)
router.put('/update/:id',verifyToken,updateUser)
router.put('/sub/:id', verifyToken,subscribe)
router.put('/unsub/:id',verifyToken,unsubscribe)
router.put('/like/:videoId',verifyToken,like)
router.put('/dislike/:videoId',verifyToken,dislike)
router.get('/subchannels',verifyToken,subChannels)
router.get('/searchChannel/:key',searchChannel)

export default router
