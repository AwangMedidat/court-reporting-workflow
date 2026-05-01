import Link from 'next/link'
import JobTable from '@/components/JobTable'
import { getJobs } from '@/lib/api'

export default async function DashboardPage() {
  const jobs = await getJobs()

  return (
    <main className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Court Reporting Workflow Dashboard
        </h1>
        <Link href="/create-job">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Create Job
</button>
        </Link>
      </div>

      <JobTable jobs={jobs} />
    </main>
  )
}