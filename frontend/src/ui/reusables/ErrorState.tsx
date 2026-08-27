interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="flex min-h-screen items-center justify-center px-6" role="alert">
    <div className="max-w-md text-center">
      <p className="font-display text-xl font-semibold">Couldn&apos;t load the portfolio</p>
      <p className="mt-2 text-[var(--color-muted)]">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-full px-5 py-2 font-medium text-white transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(100deg, var(--accent-from), var(--accent-to))' }}
      >
        Try again
      </button>
    </div>
  </div>
);
