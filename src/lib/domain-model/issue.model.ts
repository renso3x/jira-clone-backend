import * as Nedb from 'nedb'
import * as uuid from 'uuid'
import { Issue } from '../model/Issue'

export interface FilterOptions extends Issue {
  limit: number,
  page: number,
}

export class IssueModel {
  private nedb: Nedb

  constructor() {
    this.nedb = new Nedb('database/issue.db')
    this.nedb.ensureIndex({ fieldName: 'id', unique: true })
    this.nedb.loadDatabase()
  }

  async getIssueById(issueId: string): Promise<Issue | undefined> {
    return new Promise(async (resolve, reject) => {
      this.nedb.find({ id: issueId })
      .exec(async(err: Error, doc: Issue[]) => {
        if (err) reject(err)

        if (doc.length === 0) resolve(null)

        resolve(doc[0])
      })
    })
  }

  async createIssue(issue: Omit<Issue, 'id' | 'dateCreated'>): Promise<Issue | undefined> {
    return new Promise(async (resolve, reject) => {
      this.nedb.insert({
        id: uuid.v4(),
        dateCreated: new Date(),
        ...issue
      }, (err, doc) => {
        if (err) reject(err)
        resolve(doc)
      })
    })
  }

  async updateIssue(issue: Partial<Issue>, issueId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.nedb.update({ id: issueId }, { $set: issue }, {}, (err, numUpdated, updatedIssue) => {
        if (err) reject(err)
        if (numUpdated === 0) reject(err)
        resolve(true)
      })
    })
  }

  async deleteIssue(issueId: string ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.nedb.remove({ id: issueId }, (err, n) => {
        if (err) reject(err)
        if (n === 0) resolve(false)
        resolve(true)
      })
    })
  }

  async getAllIssues(filterOptions: Partial<FilterOptions>): Promise<Issue[] | []> {
    const { limit, page } = filterOptions

    return new Promise(async (resolve, reject) => {
      this.nedb.find({})
      .sort({ id: 1, dateCreated: 1 })
      .skip(page)
      .limit(limit)
      .exec(async(err: Error, doc: []) => {
        if (err) reject(err)

        if (doc.length === 0) resolve([])

        resolve(doc)
      })
    })
  }
}