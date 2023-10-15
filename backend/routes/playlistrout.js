import express from 'express'
import {changeName, creatPlaylist,delVideoPlaylist,getPlaylist,getSinglePlaylist,updatePlaylist} from '../controllers/playlistContoller.js'
import { verifyToken } from "../verifyToken.js";
const router = express.Router()

router.post('/createplaylist',verifyToken,creatPlaylist)
router.get('/playlists',getPlaylist)
router.get('/playlist/:id',getSinglePlaylist)
router.put('/updatelist/:id/:videoId',verifyToken,updatePlaylist)
router.put('/updatename/:id',verifyToken,changeName)
router.put('/dellistvideo/:id/:videoId',verifyToken,delVideoPlaylist)

export default router