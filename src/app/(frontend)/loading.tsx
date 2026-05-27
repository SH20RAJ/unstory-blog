export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-xs flex-col items-center space-y-8">
        <div className="relative flex items-center justify-center">
          <span className="animate-pulse font-serif text-5xl font-black text-un-text">
            Unstory
          </span>
          <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-brand/20">
            <div className="h-full bg-brand animate-loading-bar" />
          </div>
        </div>
        
        <p className="animate-pulse text-center text-xs font-black uppercase tracking-[0.3em] text-un-muted">
          Decrypting Intelligence
        </p>
      </div>
    </div>
  );
}
