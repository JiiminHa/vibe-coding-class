'use client';

import { useRef } from 'react';
import type { ContentInput } from '@/types/content';
import TextInput from '@/components/ui/TextInput';

interface ContentInputFormProps {
  subject: string;
  keywords: string;
  photoDataUrl?: string;
  onContentChange: (patch: Partial<Pick<ContentInput, 'subject' | 'keywords' | 'photoDataUrl'>>) => void;
}

export default function ContentInputForm({ subject, keywords, photoDataUrl, onContentChange }: ContentInputFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onContentChange({ photoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  function handleClear() {
    onContentChange({ photoDataUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="space-y-6">
      <TextInput
        label="카드뉴스 주제"
        placeholder="어떤 카피를 만들까요? (예: 파이썬 기초 특강 안내)"
        value={subject}
        onChange={(e) => onContentChange({ subject: e.target.value })}
      />
      <TextInput
        label="핵심 키워드"
        placeholder="쉼표(,)로 구분해서 입력해주세요 (예: 무료, 선착순, 비전공자 환영)"
        value={keywords}
        onChange={(e) => onContentChange({ keywords: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-primary">참고 사진 (선택)</label>

        {photoDataUrl ? (
          <div className="relative w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoDataUrl}
              alt="참고 사진 미리보기"
              className="h-40 w-auto rounded-md border border-hairline object-cover"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white text-xs hover:bg-red-500 transition-colors"
              aria-label="사진 제거"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-hairline bg-white/50 p-8 text-center hover:border-brand-pink/40 hover:bg-white transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
            <span className="text-sm text-muted">클릭해서 이미지 업로드</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
