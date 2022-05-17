import { IssueModel } from '../lib/domain-model/issue.model'


const db = new IssueModel()

async function create() {
  const issues = [{
    title: 'Bug tst',
    description: 'This is a bug test',
    dateCreated: new Date()
  }, {
    title: 'Bug test - 2',
    description: 'This is a bug test',
    dateCreated: new Date()
  }]
  const resp = await Promise.all(issues.map(async issue => await db.createIssue(issue)))
  console.log('create resp', resp)
}

async function getIssues() {
  const issues = await db.getAllIssues({ page: 0, limit: 10 })
  console.log('all issues', issues)
}

async function getIssueById(issueId) {
  const issue = await db.getIssueById(issueId)
  console.log('get issue by id', issue)
}

async function updateIsue(issue, issueId) {
  const resp = await db.updateIssue(issue, issueId)
  console.log('updating this issue', resp)
}

async function delet(issueId) {
  const resp = await db.deleteIssue(issueId)
  console.log('deleting issue', resp)
}

// create()
getIssues()
// getIssueById('62d3a892-106e-4d01-b0a7-f99a593825fa')
// updateIsue({title: "Bug Test - 3"},'62d3a892-106e-4d01-b0a7-f99a593825fa')
// getIssueById('62d3a892-106e-4d01-b0a7-f99a593825fa')
delet('e84b6894-0c82-4ecf-9b6c-40e024df2b79')
getIssues()
