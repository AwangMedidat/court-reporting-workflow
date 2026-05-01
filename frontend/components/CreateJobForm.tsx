'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createJob } from '@/lib/api'

export default function CreateJobForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    caseName: '',
    duration: 0,
    location: 'remote',
    city: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createJob(form)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg">
      <input
        className="border p-2 w-full"
        placeholder="Case Name"
        onChange={(e) =>
          setForm({ ...form, caseName: e.target.value })
        }
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Duration"
        onChange={(e) =>
          setForm({ ...form, duration: Number(e.target.value) })
        }
      />
      <input
        className="border p-2 w-full"
        placeholder="City"
        onChange={(e) =>
          setForm({ ...form, city: e.target.value })
        }
      />
      <select
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      >
        <option value="remote">Remote</option>
        <option value="physical">Physical</option>
      </select>
      <button type="submit">Create Job</button>
    </form>
  )
}