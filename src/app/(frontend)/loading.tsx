export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8 max-w-xs w-full">
        {/* Animated Logo Placeholder */}
        <div className="relative flex items-center justify-center">
          <span className="text-4xl font-serif font-black tracking-tighter text-un-text animate-pulse">
            UNSTORY
          </span>
          <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-brand/20">
            <div className="h-full bg-brand animate-loading-bar" />
          </div>
        </div>
        
        <p className="text-xs uppercase tracking-[0.3em] text-un-muted font-bold animate-pulse text-center">
          Decrypting Intelligence
        </p>
      </div>
    </div>
  );
}
