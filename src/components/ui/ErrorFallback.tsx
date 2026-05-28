interface ErrorFallbackProps {
  message?: string;
  copyText?: string;
}

export default function ErrorFallback({
  message = 'Figma 삽입에 실패했어요.',
  copyText,
}: ErrorFallbackProps) {
  return (
    <div className="rounded-[12px] border border-hairline bg-white p-4 flex flex-col gap-3" aria-live="polite">
      <p className="text-sm font-medium text-[#e53e3e]">{message}</p>
      {copyText && (
        <textarea
          readOnly
          className="w-full rounded-[12px] border border-hairline p-3 text-sm text-primary resize-none"
          rows={6}
          value={copyText}
          aria-label="생성된 카피 수동 복사 영역"
        />
      )}
    </div>
  );
}
