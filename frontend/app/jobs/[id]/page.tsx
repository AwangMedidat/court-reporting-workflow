import Link from "next/link";
import PaymentCard from "@/components/PaymentCard";
import { getJobPayment, getJobs } from "@/lib/api";
import { Job } from "@/lib/interfaces/job.interfaces";

type Props = {
  params: Promise<{
    id: string;
  }>;
};



async function getJobDetail(id: string) {
  const jobs = await getJobs();
  const job = jobs.find((item: Job) => item.id === id);
  const payment = await getJobPayment(id);

  return { job, payment };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const { job, payment } = await getJobDetail(id);

  return (
    <main className="p-8 space-y-6">
      <Link href="/">← Back to Dashboard</Link>

      <h1 className="text-3xl font-bold">Job Detail</h1>

      <div className="border rounded-lg p-6 space-y-2">
        <p>
          <strong>Case Name:</strong> {job.caseName}
        </p>
        <p>
          <strong>Duration:</strong> {job.duration} minutes
        </p>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Reporter:</strong> {job.reporter?.name || "-"}
        </p>
        <p>
          <strong>Editor:</strong> {job.editor?.name || "-"}
        </p>
      </div>

      {job.reporter && job.editor && (
        <PaymentCard
          reporterPayment={payment.reporterPayment}
          editorPayment={payment.editorPayment}
          totalPayout={payment.totalPayout}
        />
      )}
    </main>
  );
}
