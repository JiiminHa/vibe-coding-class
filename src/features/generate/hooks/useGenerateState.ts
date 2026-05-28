'use client';

import { useState } from 'react';
import type { Template } from '@/types/template';
import type { ContentInput } from '@/types/content';
import type { GeneratedCopy } from '@/types/copy';
import { generateCopy } from '@/app/actions/generate';

export function useGenerateState() {
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(contentInput: ContentInput, selectedTemplate: Template) {
    setIsLoading(true);
    setError(null);
    setGeneratedCopy(null);
    try {
      const copy = await generateCopy(contentInput, selectedTemplate);
      setGeneratedCopy(copy);
    } catch (e) {
      setError(e instanceof Error ? e.message : '카피 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  return { generatedCopy, isLoading, error, handleGenerate };
}
