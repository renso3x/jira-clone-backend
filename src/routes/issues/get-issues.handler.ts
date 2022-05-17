import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { FilterOptions } from '../../lib/domain-model/issue.model'
import { issueService } from './issue.service'

const getIssues = async (req: Request, res: Response) => {
  const { query } = req
  const limit = parseInt(query.limit as string) || 5
  const page = parseInt(query.page as string) || 0
  const filterOptions: Partial<FilterOptions> = {
    limit,
    page,
  }

  const issues = await issueService().getAllIssues(filterOptions)

  return res.status(StatusCodes.OK).send(issues)
}

export { getIssues }