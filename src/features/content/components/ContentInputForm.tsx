'use client';

import type { ContentInput } from '@/types/content';
import TextInput from '@/components/ui/TextInput';

interface ContentInputFormProps {
  contentInput: ContentInput;
  onContentChange: (patch: Partial<ContentInput>) => void;
}

export default function ContentInputForm({ contentInput, onContentChange }: ContentInputFormProps) {
  return (
    <div className="space-y-6">
      <TextInput
        label="주제"
        placeholder="어떤 카피를 만들까요? (예: 파이썬 기초 특강 안내)"
        value={contentInput.subject}
        onChange={(e) => onContentChange({ subject: e.target.value })}
      />
      <TextInput
        label="핵심 키워드"
        placeholder="쉼표(,)로 구분해서 입력해주세요 (예: 무료, 선착순, 비전공자 환영)"
        value={contentInput.keywords}
        onChange={(e) => onContentChange({ keywords: e.target.value })}
      />
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-primary">참고 사진 (선택)</label>
        <div className="border-2 border-dashed border-hairline rounded-md p-8 flex flex-col items-center justify-center bg-white/50 hover:bg-white hover:border-brand-pink/40 transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-surface-card rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-brand-pink transition-colors">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <p className="text-sm text-muted">이미지를 드래그하거나 클릭하여 업로드</p>
        </div>
      </div>
    </div>
  );
}
