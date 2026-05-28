'use client';

import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface GenerateButtonProps {
  isLoading: boolean;
  disabled: boolean;
  disabledReason?: string;
  onClick: () => void;
}

export default function GenerateButton({ isLoading, disabled, disabledReason, onClick }: GenerateButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="w-full max-w-md h-16 text-lg rounded-xl shadow-lg bg-brand-pink hover:bg-brand-pink/90 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <LoadingSpinner />
            <span>Claude가 작성 중...</span>
          </div>
        ) : (
          '카피 생성하기'
        )}
      </Button>
      {disabled && !isLoading && disabledReason ? (
        <p className="text-xs text-red-400" aria-live="polite">{disabledReason}</p>
      ) : (
        <p className="text-xs text-muted">Claude가 당신의 주제를 바탕으로 카피를 작성합니다.</p>
      )}
    </div>
  );
}
