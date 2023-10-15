
import express from 'express'
import { verifyToken } from "../verifyToken.js";
import { CreateCommunity, getCommunities, getCommunity, publishCommunity } from '../controllers/communityController.js';
const router = express.Router()
router.get('/posts',getCommunities)
router.get('/post/:id',getCommunity)
router.post('/createPost',verifyToken,CreateCommunity)
router.put('/publishPost/:id',publishCommunity)

export default router
