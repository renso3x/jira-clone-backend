import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { issueService } from './issue.service'

interface Req extends Request {
  body: {
    title: string
    description: string
  }
}

const createIssue = async (req: Request, res: Response) => {
  const { body } = req as Req

  const issue = await issueService().createIssue(body)

  return res.status(StatusCodes.CREATED).send(issue)
}

export { createIssue }