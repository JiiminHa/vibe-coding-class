export default function LoadingSpinner({ label = '로딩 중...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2" aria-busy="true" aria-label={label}>
      <svg
        className="h-5 w-5 animate-spin text-brand-pink"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="text-sm text-[#6b6b6b]">{label}</span>
    </div>
  );
}
