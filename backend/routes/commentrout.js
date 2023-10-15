
import express from 'express'
import { verifyToken } from "../verifyToken.js";
import { addComment, getComment } from '../controllers/commentController.js';

const router = express.Router()
router.post('/addcomment',verifyToken,addComment)
router.get('/:currentVideoId',getComment)

export default router
