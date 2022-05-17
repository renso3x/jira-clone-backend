import * as express from 'express'
import { issuesRouter } from './routes/issues'

const router = express.Router()

router.use('/issues', issuesRouter)

export default router