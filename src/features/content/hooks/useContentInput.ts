'use client';

import { useState } from 'react';
import type { ContentInput } from '@/types/content';
import { DEFAULT_CONTENT_VALUES } from '@/features/content/constants';

const SESSION_KEY = 'cardflow_content';

function loadFromSession(): ContentInput {
  if (typeof window === 'undefined') return DEFAULT_CONTENT_VALUES;
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? (JSON.parse(saved) as ContentInput) : DEFAULT_CONTENT_VALUES;
  } catch {
    return DEFAULT_CONTENT_VALUES;
  }
}

function saveToSession(value: ContentInput): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } catch {
    // sessionStorage 접근 불가 환경(e.g. SSR, private 브라우저) 무시
  }
}

export function useContentInput() {
  const [contentInput, setContentInput] = useState<ContentInput>(loadFromSession);

  function handleContentChange(patch: Partial<ContentInput>) {
    setContentInput((prev) => {
      const next = { ...prev, ...patch };
      saveToSession(next);
      return next;
    });
  }

  function handleModeChange(mode: ContentInput['mode']) {
    // 모드 전환 시 주제·키워드 초기화
    handleContentChange({ mode, subject: '', keywords: '' });
  }

  return { contentInput, handleContentChange, handleModeChange };
}
