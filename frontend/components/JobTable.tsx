"use client";

import Link from "next/link";
import { assignEditor, assignReporter, updateJobStatus } from "@/lib/api";
import { Job } from "@/lib/interfaces/job.interfaces";

type Props = {
  jobs: Job[];
};

export default function JobTable({ jobs }: Props) {
  const handleAssignReporter = async (id: string) => {
    await assignReporter(id);
    window.location.reload();
  };

  const handleTranscribed = async (id: string) => {
    await updateJobStatus(id, "TRANSCRIBED");
    window.location.reload();
  };

  const handleAssignEditor = async (id: string) => {
    await assignEditor(id);
    window.location.reload();
  };

  const handleComplete = async (id: string) => {
    await updateJobStatus(id, "COMPLETED");
    window.location.reload();
  };

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th>Case</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Reporter</th>
          <th>Editor</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>
              <Link href={`/jobs/${job.id}`}>{job.caseName}</Link>
            </td>
            <td>{job.duration} min</td>
            <td>{job.status}</td>
            <td>{job.reporter?.name || "-"}</td>
            <td>{job.editor?.name || "-"}</td>
            <td className="space-x-2">
              {job.status === "NEW" && (
                <button
                  onClick={() => handleAssignReporter(job.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Assign Reporter
                </button>
              )}
              {job.status === "ASSIGNED" && (
                <button
                  onClick={() => handleTranscribed(job.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Mark Transcribed
                </button>
              )}
              {job.status === "TRANSCRIBED" && (
                <button
                  onClick={() => handleAssignEditor(job.id)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  Assign Editor
                </button>
              )}
              {job.status === "REVIEWED" && (
                <button
                  onClick={() => handleComplete(job.id)}
                  className="bg-gray-800 text-white px-3 py-1 rounded"
                >
                  Complete Job
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
