'use client';

import type { Mode } from '@/types/content';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-surface-strong rounded-pill w-fit">
      <button
        onClick={() => onModeChange('likelion')}
        className={`px-6 py-2 rounded-pill text-sm font-semibold transition-all ${
          mode === 'likelion'
            ? 'bg-primary text-white shadow-sm'
            : 'text-muted hover:text-ink'
        }`}
      >
        멋사 홍보
      </button>
      <button
        onClick={() => onModeChange('study')}
        className={`px-6 py-2 rounded-pill text-sm font-semibold transition-all ${
          mode === 'study'
            ? 'bg-primary text-white shadow-sm'
            : 'text-muted hover:text-ink'
        }`}
      >
        공부 기록
      </button>
    </div>
  );
}
