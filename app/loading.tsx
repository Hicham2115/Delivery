import { LoadingIndicator } from "@/components/loading-indicator";

export default function Loading() {
  return (
    <div className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-black px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 size-[420px] rounded-full bg-gold/10 blur-3xl"
      />
      <LoadingIndicator />
    </div>
  );
}
