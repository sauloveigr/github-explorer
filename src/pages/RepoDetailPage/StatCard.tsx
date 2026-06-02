interface Props {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: Props) {
  return (
    <div className="col">
      <dl className="border rounded p-3 text-center h-100 mb-0">
        <dd className="fs-5 fw-semibold mb-0">{value}</dd>
        <dt className="text-muted small fw-normal">{label}</dt>
      </dl>
    </div>
  );
}
