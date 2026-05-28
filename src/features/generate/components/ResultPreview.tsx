'use client';

import { useState } from 'react';
import type { GeneratedCopy } from '@/types/copy';
import type { Template } from '@/types/template';
import { buildClipboardJson } from '../utils';

interface ResultPreviewProps {
  generatedCopy: GeneratedCopy;
  selectedTemplate: Template | null;
}

export default function ResultPreview({ generatedCopy, selectedTemplate }: ResultPreviewProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const [fallbackJson, setFallbackJson] = useState('');

  async function handleCopyToClipboard() {
    if (!selectedTemplate) return;
    const json = buildClipboardJson(generatedCopy, selectedTemplate);
    const text = JSON.stringify(json, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setFallbackJson(text);
      setCopyState('fallback');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">생성된 카피 결과</h3>
          <span className="text-sm text-muted">{generatedCopy.slides.length}개의 슬라이드</span>
        </div>

        {selectedTemplate && (
          <button
            onClick={handleCopyToClipboard}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              copyState === 'copied'
                ? 'bg-brand-teal text-white border-brand-teal'
                : 'bg-white text-primary border-hairline hover:border-brand-pink hover:text-brand-pink'
            }`}
          >
            {copyState === 'copied' ? '복사됨 ✓' : '클립보드 복사'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedCopy.slides.map((slide) => (
          <div key={slide.slideNumber} className="bg-surface-card rounded-xl p-6 border border-hairline relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2 py-1 bg-white border border-hairline rounded-md text-primary">
                Slide {slide.slideNumber}
              </span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-ink line-clamp-2">{slide.title}</h4>
            <p className="text-sm text-body leading-relaxed mb-4 line-clamp-4">{slide.body}</p>
            {slide.hashtags && slide.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {slide.hashtags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold text-muted bg-white px-2 py-0.5 rounded-full border border-hairline">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {copyState === 'fallback' && (
        <div className="mt-4 space-y-2" aria-live="polite">
          <p className="text-sm text-muted">클립보드 접근이 차단되었습니다. 아래 내용을 직접 복사하세요.</p>
          <textarea
            readOnly
            value={fallbackJson}
            className="w-full h-48 rounded-lg border border-hairline p-3 text-xs font-mono bg-white resize-none focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
