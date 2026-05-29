'use client';

import type { Mode } from '@/types/content';
import { MODE_META } from '@/features/content/constants';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-1.5 bg-surface-strong rounded-pill w-fit">
        {(Object.keys(MODE_META) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={`px-6 py-2 rounded-pill text-sm font-semibold transition-all ${
              mode === m ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {MODE_META[m].label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">{MODE_META[mode].desc}</p>
    </div>
  );
}
