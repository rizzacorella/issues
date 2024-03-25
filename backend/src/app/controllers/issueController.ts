import { Request, Response, NextFunction } from 'express'
import { IssueService } from '../services/issueService.js'
import { CustomError, customErrors } from '../middlewares/errorHandler.js'

export class IssueController {
  issueService: IssueService

  constructor(issueService: IssueService) {
    this.issueService = issueService
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const issue = this.issueService.create(req.body)
      res.json(issue)
    } catch (err) {
      this.propagateError(err, next)
    }
  }

  public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(this.issueService.list())
    } catch (err) {
      this.propagateError(err, next)
    }
  }

  public read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.params.id) {
        return next(new CustomError(customErrors.ID_ERROR))
      }
      const issue = this.issueService.read(parseInt(req.params.id))
      res.json(issue)
    } catch (err) {
      this.propagateError(err, next)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.params.id) {
        return next(new CustomError(customErrors.ID_ERROR))
      }
      const issue = this.issueService.update(parseInt(req.params.id), req.body)
      res.json(issue)
    } catch (err) {
      this.propagateError(err, next)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.params.id) {
        return next(new CustomError(customErrors.ID_ERROR))
      }
      this.issueService.delete(parseInt(req.params.id))
      res.json({
        message: 'Issue deleted.'
      })
    } catch (err) {
      this.propagateError(err, next)
    }
  }

  private propagateError = (err: any, next: NextFunction) => {
    console.error(err)
    if (err instanceof CustomError) {
      next(err)
    } else {
      const { INTERNAL_SERVER_ERROR: serverError } = customErrors
      next(new CustomError(serverError))
    }
  }
}