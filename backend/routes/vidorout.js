
import express from 'express'
import { verifyToken } from "../verifyToken.js";
import {getvideos,getvideo,postvideo,updatevideo,subvideos,deletevideo, addView, random, trend, relatedVideos, playlistvideo, searchVideo, latest, oldest} from '../controllers/videocontroller.js';
const router = express.Router()
router.get('/videos',getvideos)
router.get('/sub/videos',verifyToken,subvideos)
router.post('/post/video',verifyToken,postvideo)
router.get('/video/:id',getvideo)
router.put('/update/:videoId',verifyToken,updatevideo)
router.delete('/del/video',deletevideo)
router.get('/random',random)
router.put('/Popular',trend)
router.get('/Latest',latest)
router.get('/Oldest',oldest)
router.get('/related/:videoId',relatedVideos)
router.get('/related/:videoId',relatedVideos)
router.get('/playlist/:id',playlistvideo)
router.put('/view/:videoId',verifyToken,addView)
router.get('/search/:key',searchVideo)


export default router
