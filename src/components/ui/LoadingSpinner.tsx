export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-un-border rounded-full" />
        <div className="absolute inset-0 border-4 border-brand rounded-full border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
