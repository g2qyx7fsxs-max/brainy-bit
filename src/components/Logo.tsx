const BRAIN_SILHOUETTE =
  "M50,15 C58,15 64,20 66,26 C74,24 82,30 82,40 C90,42 92,52 86,58 C90,66 86,76 76,78 C76,86 66,90 58,86 C54,90 46,90 42,86 C34,90 24,86 24,78 C14,76 10,66 14,58 C8,52 10,42 18,40 C18,30 26,24 34,26 C36,20 42,15 50,15 Z";
const CENTER_LINE = "M50,20 C47,35 53,48 49,63 C51,74 49,80 50,86";
const LEFT_FOLD_1 = "M28,38 C33,41 33,47 28,50";
const RIGHT_FOLD_1 = "M72,38 C67,41 67,47 72,50";
const LEFT_FOLD_2 = "M24,58 C30,60 30,66 25,69";
const RIGHT_FOLD_2 = "M76,58 C70,60 70,66 75,69";

export function BrainMark({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={BRAIN_SILHOUETTE} fill="#ec4899" />
      <g stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55">
        <path d={CENTER_LINE} />
        <path d={LEFT_FOLD_1} />
        <path d={RIGHT_FOLD_1} />
        <path d={LEFT_FOLD_2} />
        <path d={RIGHT_FOLD_2} />
      </g>
    </svg>
  );
}

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-600 ${className}`}
    >
      <BrainMark className="h-[78%] w-[78%]" />
    </span>
  );
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-lg font-extrabold text-gray-900">Brainy Bit</span>
    </span>
  );
}
