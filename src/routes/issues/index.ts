import * as express from 'express'
import { createIssue } from './create-issues.handler'
import { deleteIssue } from './delete-issue.handler'
import { getIssueById } from './get-issue-by-id.handler'
import { getIssues } from './get-issues.handler'
import { updateIssue } from './update-issue.handler'

const router = express.Router()

router.get('/', getIssues)
router.post('/', createIssue)
router.get('/:id', getIssueById)
router.put('/:id', updateIssue)
router.delete('/:id', deleteIssue)


export { router as issuesRouter }