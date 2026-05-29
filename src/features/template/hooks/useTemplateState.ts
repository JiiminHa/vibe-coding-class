'use client';

import { useEffect, useState } from 'react';
import type { Template } from '@/types/template';
import type { ParsedLayer } from '@/types/template';
import { loadTemplates, saveTemplates } from '../storage';

export function useTemplateState() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [parsedLayers, setParsedLayers] = useState<ParsedLayer[] | null>(null);
  const [parsedFigmaUrl, setParsedFigmaUrl] = useState('');

  useEffect(() => {
    // 앱 첫 진입 시 저장된 템플릿 로드 + 첫 번째 자동 선택
    const saved = loadTemplates();
    setTemplates(saved);
    if (saved.length > 0) setSelectedTemplate(saved[0]);
  }, []);

  function handleLayersParsed(layers: ParsedLayer[], figmaUrl: string) {
    setParsedLayers(layers);
    setParsedFigmaUrl(figmaUrl);
  }

  function handleTemplateSave(template: Template) {
    // 이미 상태로 관리 중인 목록에 추가 — loadTemplates() 재호출 불필요
    const updated = [...templates, template];
    saveTemplates(updated);
    setTemplates(updated);
    setSelectedTemplate(template);
    setParsedLayers(null);
    setParsedFigmaUrl('');
  }

  function handleTemplateDelete(id: string) {
    const updated = templates.filter((t) => t.id !== id);
    saveTemplates(updated);
    setTemplates(updated);
    if (selectedTemplate?.id === id) setSelectedTemplate(updated[0] ?? null);
  }

  return {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    parsedLayers,
    parsedFigmaUrl,
    handleLayersParsed,
    handleTemplateSave,
    handleTemplateDelete,
    clearParsedLayers: () => setParsedLayers(null),
  };
}
