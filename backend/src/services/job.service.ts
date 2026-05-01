import prisma from '../lib/prisma'
import { JobStatus } from '@prisma/client'

export const createJob = async (data: {
    caseName: string
    duration: number
    location: string
    city: string
  }) => {
    return prisma.job.create({
      data,
    })
  }

export const assignReporter = async (jobId: string) => {
    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (!job) throw new Error('Job not found')
  
    let reporter
  
    if (job.location === 'physical') {
      reporter = await prisma.reporter.findFirst({
        where: {
          location: job.city,
          availability: true,
        },
      })
    }
  
    if (!reporter) {
      await prisma.reporter.updateMany({
    data: { availability: true },
  })

  reporter = await prisma.reporter.findFirst({
    where:
      job.location === 'physical'
        ? {
            location: job.city,
            availability: true,
          }
        : {
            availability: true,
          },
  })
    }
  
    if (!reporter) throw new Error('No available reporter')
  
    await prisma.reporter.update({
      where: { id: reporter.id },
      data: { availability: false },
    })
  
    return prisma.job.update({
      where: { id: jobId },
      data: {
        reporterId: reporter.id,
        status: JobStatus.ASSIGNED,
      },
      include: { reporter: true },
    })
  }

export const assignEditor = async (jobId: string) => {
  let editor = await prisma.editor.findFirst({
    where: { availability: true },
  })

  if (!editor) {
  await prisma.editor.updateMany({
    data: { availability: true },
  })

  editor = await prisma.editor.findFirst({
    where: { availability: true },
  })
}

  if (!editor) throw new Error('No available editor')

  await prisma.editor.update({
    where: { id: editor.id },
    data: { availability: false },
  })

  return prisma.job.update({
    where: { id: jobId },
    data: {
      editorId: editor.id,
      status: JobStatus.REVIEWED,
    },
    include: { editor: true },
  })
}

export const updateJobStatus = async (
  jobId: string,
  status: JobStatus,
) => {
  return prisma.job.update({
    where: { id: jobId },
    data: { status },
  })
}

export const calculatePayment = async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      reporter: true,
      editor: true,
    },
  })

  if (!job || !job.reporter || !job.editor) {
    throw new Error('Incomplete job assignment')
  }

  const reporterPayment = job.duration * job.reporter.ratePerMinute
  const editorPayment = job.editor.flatFee

  return {
    reporterPayment,
    editorPayment,
    totalPayout: reporterPayment + editorPayment,
  }
}

export const getAllJobs = async () => {
  return prisma.job.findMany({
    include: {
      reporter: true,
      editor: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}