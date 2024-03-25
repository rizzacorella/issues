import express from 'express'
import { IssueController } from '../controllers/issueController.js'
import { IssueService } from '../services/issueService.js'
export const router = express.Router()

export const issueService = new IssueService()
export const issueController = new IssueController(issueService)

router.post('/', issueController.create)
router.delete('/:id', issueController.delete)
router.get('/:id', issueController.read)
router.put('/:id', issueController.update)
