import { Request, Response, NextFunction } from 'express'
import { IssueService } from '../services/issueService.js'
import { CustomError, customErrors } from '../middlewares/errorHandler.js'

export class IssueController {
  issueService: IssueService

  constructor(issueService: IssueService) {
    this.issueService = issueService
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const issue = this.issueService.create(req.body)
    res.json(issue)
  }

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(this.issueService.list())
  }

  public read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
      return next(new CustomError(customErrors.ID_ERROR))
    }
    const issue = this.issueService.read(parseInt(req.params.id))
    res.json(issue)
  }

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
      return next(new CustomError(customErrors.ID_ERROR))
    }
    const issue = this.issueService.update(parseInt(req.params.id), req.body)
    res.json(issue)
  }

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
      return next(new CustomError(customErrors.ID_ERROR))
    }
    this.issueService.delete(parseInt(req.params.id))
    res.json({
      message: 'Issue deleted.'
    })
  }
}