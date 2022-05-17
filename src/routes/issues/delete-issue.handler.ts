import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { issueService } from './issue.service'

interface Req extends Request {
  params: {
    id: string
  }
}

const deleteIssue = async (req: Request, res: Response) => {
  const { params } = req as Req

  const issue = await issueService().deleteIssue(params.id)

  if (!issue) {
    return res.status(StatusCodes.NOT_FOUND).send(`Cannot find issue with id ${params.id}`)
  }

  return res.status(StatusCodes.OK).send("Issue is now deleted")
}

export { deleteIssue }