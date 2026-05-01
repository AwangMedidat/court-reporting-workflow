import { Router } from 'express'
import * as JobController from '../controllers/job.controller'

const router = Router()

router.get('/', JobController.getJobs)
router.post('/', JobController.createJob)
router.patch('/:id/assign-reporter', JobController.assignReporter)
router.patch('/:id/assign-editor', JobController.assignEditor)
router.patch('/:id/status', JobController.updateStatus)
router.get('/:id/payment', JobController.calculatePayment)

export default router