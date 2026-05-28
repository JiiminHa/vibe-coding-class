'use client';

import type { ContentInput, Tone } from '@/types/content';
import TextInput from '@/components/ui/TextInput';

interface ConditionFormProps {
  contentInput: ContentInput;
  onContentChange: (patch: Partial<ContentInput>) => void;
}

export default function ConditionForm({ contentInput, onContentChange }: ConditionFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TextInput
        label="슬라이드 수"
        type="number"
        min={1}
        max={10}
        value={contentInput.slideCount}
        onChange={(e) => onContentChange({ slideCount: Math.min(10, Math.max(1, Number(e.target.value))) })}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-primary">톤앤매너</label>
        <select
          className="min-h-[44px] rounded-md border border-hairline bg-white px-4 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-brand-pink/40"
          value={contentInput.tone}
          onChange={(e) => onContentChange({ tone: e.target.value as Tone })}
        >
          <option value="friendly">친근하게</option>
          <option value="professional">전문적으로</option>
          <option value="emotional">감성적으로</option>
        </select>
      </div>

      <TextInput
        label="타겟 독자"
        placeholder="누구에게 보여줄까요? (예: 취업 준비생, 재학생)"
        value={contentInput.targetAudience}
        onChange={(e) => onContentChange({ targetAudience: e.target.value })}
      />

      <TextInput
        label="추가 요청 (선택)"
        placeholder="특별히 반영할 내용이 있다면?"
        value={contentInput.additionalRequest ?? ''}
        onChange={(e) => onContentChange({ additionalRequest: e.target.value })}
      />
    </div>
  );
}
