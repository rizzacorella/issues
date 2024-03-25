import { Request, Response, NextFunction } from 'express'

export class CustomError extends Error {
  code: string
  status: number

  constructor(options: CustomErrorAttrs) {
    super(options.message)
    this.code = options.code
    this.status = options.status
  }
}

export interface CustomErrorAttrs {
  code: string
  message: string
  status: number
}

export const customErrors = {
  ID_ERROR: {
    code: 'ID_ERROR',
    message: 'Invalid ID',
    status: 400,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong. Please try again later.',
    status: 500,
  },
  ISSUE_NOT_FOUND: {
    code: 'ISSUE_NOT_FOUND',
    message: 'Issue was not found',
    status: 404,
  }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).send({
    code: err.code,
    message: err.message,
  })
}
