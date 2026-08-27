export const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: 'var(--ring)', borderTopColor: 'transparent' }}
      />
      <p className="font-mono text-sm text-[var(--color-muted)]">Loading portfolio…</p>
    </div>
  </div>
);
