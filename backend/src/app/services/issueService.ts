import issues from '../data/issues.js'
import { Issue } from '../models/issue.js'
import { CustomError, customErrors } from '../middlewares/errorHandler.js'

export interface IssueAttrs {
  title: string
  description: string
}

export class IssueService {
  lastId: number

  constructor() {
    this.lastId = 2
  }

  public list = (): Issue[] => {
    return issues
  }

  public create = (newIssue: IssueAttrs): Issue => {
    const { title, description } = newIssue
    const issueToSave = {
      id: this.lastId,
      title,
      description,
    }
    issues.push(issueToSave)
    this.lastId += 1
    console.info('Issue created', newIssue)
    return issueToSave
  }

  public read = (id: number): Issue | undefined => {
    const issue = issues.find(issue => issue.id === id)
    if (!issue) {
      throw new CustomError(customErrors.ISSUE_NOT_FOUND)
    }
    return issue
  }

  public update = (id: number, newIssue: IssueAttrs): Issue | undefined => {
    const index = issues.findIndex(issue => issue.id === id)
    if (index < 0) {
      throw new CustomError(customErrors.ISSUE_NOT_FOUND)
    }
    const { title, description } = newIssue
    issues[index]= {
      id,
      title,
      description,
    }
    console.info('Issue updated', issues[index])
    return issues[index]
  }

  public delete = (id: number): void => {
    const index = issues.findIndex(issue => issue.id === id)
    if (index < 0) {
      throw new CustomError(customErrors.ISSUE_NOT_FOUND)
    }
    console.info('Issue to delete', issues[index])
    issues.splice(index, 1)
    console.info('Deleted')
  }
}