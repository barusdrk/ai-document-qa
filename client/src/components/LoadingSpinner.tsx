interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Thinking...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

      <p className="text-sm text-slate-500 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}
