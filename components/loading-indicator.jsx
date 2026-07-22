import { Box, Hexagon } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex size-24 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-gold/15 border-t-gold border-r-copper animation-duration-[1.4s]" />
        <span
          aria-hidden
          className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-accent-warm/70 shimmer-reverse animation-duration-[2s]"
        />
        <span className="relative flex size-12 items-center justify-center">
          <Hexagon className="size-12 text-gold" strokeWidth={1.5} />
          <Box className="absolute size-5 text-copper" strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-heading text-xl font-semibold text-white">
          SwiftWay
        </p>
        <p className="bg-linear-to-r from-gold via-accent-warm to-copper bg-clip-text text-xs font-medium tracking-[0.2em] text-transparent">
          DELIVERING TRUST
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="size-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-accent-warm [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-copper" />
      </div>
    </div>
  );
}
