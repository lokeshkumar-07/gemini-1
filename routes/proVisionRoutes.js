import express from 'express'
import { createProVisionQuery, getAllProQueries } from '../controllers/proVisionController.js'
import multer from 'multer';
import { verifyUser } from '../middleware/verifyUser.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const proVisionRoutes = express.Router()

proVisionRoutes.post('/create', verifyUser, upload.array('images'), createProVisionQuery);
proVisionRoutes.get('/all', verifyUser, getAllProQueries);

export default proVisionRoutes