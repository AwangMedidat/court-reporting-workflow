type Props = {
    reporterPayment: number
    editorPayment: number
    totalPayout: number
  }
  
  export default function PaymentCard({
    reporterPayment,
    editorPayment,
    totalPayout,
  }: Props) {
    return (
      <div className="border rounded-lg p-6 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold">Payment Summary</h2>
        <p>Reporter Payment: Rp {reporterPayment.toLocaleString('id-ID')}</p>
        <p>Editor Payment: Rp {editorPayment.toLocaleString('id-ID')}</p>
        <p className="font-semibold">
          Total Payout: Rp {totalPayout.toLocaleString('id-ID')}
        </p>
      </div>
    )
  }