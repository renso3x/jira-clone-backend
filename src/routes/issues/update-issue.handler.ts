import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { issueService } from './issue.service'

interface Req extends Request {
  body: {
    title: string
    description: string
  }
  params: {
    id: string
  }
}

const updateIssue = async (req: Request, res: Response) => {
  const { params, body } = req as Req

  await issueService().updateIssue(body, params.id)

  return res.status(StatusCodes.OK).send("Issue has been updated")
}

export { updateIssue }