import { IssueModel, FilterOptions } from '../../lib/domain-model/issue.model'
import { Issue } from "src/lib/model/Issue"

export const issueService = () => {
  const issueModel: IssueModel = new IssueModel()

  const getAllIssues = async (filterOptions: Partial<FilterOptions>) => {
    return await issueModel.getAllIssues(filterOptions)
  }

  const createIssue = async (issue: Omit<Issue, "id" | "dateCreated">) => {
    return await issueModel.createIssue(issue)
  }

  const getIssueById = async (issueId) => {
    return await issueModel.getIssueById(issueId)
  }

  const updateIssue = async (issue, issueId) => {
    return await issueModel.updateIssue(issue, issueId)
  }

  const deleteIssue = async (issueId) => {
    return await issueModel.deleteIssue(issueId)
  }

  return {
    getAllIssues,
    createIssue,
    getIssueById,
    updateIssue,
    deleteIssue
  }
}