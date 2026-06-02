interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="alert alert-danger" role="alert">
      {message}
    </p>
  );
}
