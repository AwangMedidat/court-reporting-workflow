import { Request, Response } from 'express'
import * as JobService from '../services/job.service'

export const createJob = async (req: Request, res: Response) => {
    const job = await JobService.createJob(req.body)
    res.status(201).json(job)
  }
  
  export const assignReporter = async (req: Request, res: Response) => {
    const job = await JobService.assignReporter(req.params.id as string)
    res.json(job)
  }
  
  export const assignEditor = async (req: Request, res: Response) => {
    const job = await JobService.assignEditor(req.params.id as string)
    res.json(job)
  }
  
  export const updateStatus = async (req: Request, res: Response) => {
    const job = await JobService.updateJobStatus(
      req.params.id as string,
      req.body.status,
    )
    res.json(job)
  }
  
  export const calculatePayment = async (req: Request, res: Response) => {
    const payment = await JobService.calculatePayment(req.params.id as string)    
    res.json(payment)
  }
  
  export const getJobs = async (_req: Request, res: Response) => {
    const jobs = await JobService.getAllJobs()
    res.json(jobs)
  }