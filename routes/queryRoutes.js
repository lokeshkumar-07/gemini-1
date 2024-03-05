import express from 'express'
import { allQueries, postQuery } from '../controllers/queryController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const queryRoutes = express.Router()

queryRoutes.post('/new', verifyUser, postQuery)
queryRoutes.get('/all', verifyUser, allQueries )

export default queryRoutes