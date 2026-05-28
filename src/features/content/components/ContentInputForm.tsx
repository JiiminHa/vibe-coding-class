'use client';

import type { ContentInput } from '@/types/content';
import TextInput from '@/components/ui/TextInput';

interface ContentInputFormProps {
  subject: string;
  keywords: string;
  onContentChange: (patch: Partial<Pick<ContentInput, 'subject' | 'keywords'>>) => void;
}

export default function ContentInputForm({ subject, keywords, onContentChange }: ContentInputFormProps) {
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
    </div>
  );
}
