const BASE_URL = 'http://localhost:8000/api'

export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    cache: 'no-store',
  })
  return res.json()
}

export const getJobPayment = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}/payment`, {
    cache: 'no-store',
  })
  return res.json()
}

export const createJob = async (payload: any) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return res.json()
}

export const assignReporter = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}/assign-reporter`, {
    method: 'PATCH',
  })

  return res.json()
}

export const assignEditor = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}/assign-editor`, {
    method: 'PATCH',
  })

  return res.json()
}

export const updateJobStatus = async (id: string, status: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  return res.json()
}