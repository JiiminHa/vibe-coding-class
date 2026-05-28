'use client';

import { useEffect, useState } from 'react';
import type { Template, LayerMapping } from '@/types/template';
import type { ContentInput } from '@/types/content';
import type { GeneratedCopy } from '@/types/copy';
import { loadTemplates, saveTemplates } from '@/features/template/storage';
import { generateCopy } from '@/app/actions/generate';
import AppHeader from '@/components/layout/AppHeader';
import EmptyState from '@/components/ui/EmptyState';
import TemplateList from '@/features/template/components/TemplateList';
import TemplateRegistration from '@/features/template/components/TemplateRegistration';
import LayerMappingForm from '@/features/template/components/LayerMappingForm';
import ModeSelector from '@/features/content/components/ModeSelector';
import ContentInputForm from '@/features/content/components/ContentInputForm';
import ConditionForm from '@/features/content/components/ConditionForm';
import GenerateButton from '@/features/generate/components/GenerateButton';
import ResultPreview from '@/features/generate/components/ResultPreview';
import FigmaInsertButton from '@/features/generate/components/FigmaInsertButton';

const DEFAULT_CONTENT: ContentInput = {
  mode: 'likelion',
  subject: '',
  keywords: '',
  slideCount: 5,
  tone: 'friendly',
  targetAudience: '',
  additionalRequest: '',
};

export default function AppPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [parsedLayers, setParsedLayers] = useState<Pick<LayerMapping, 'nodeId' | 'layerName'>[] | null>(null);
  const [parsedFigmaUrl, setParsedFigmaUrl] = useState('');
  const [contentInput, setContentInput] = useState<ContentInput>(DEFAULT_CONTENT);
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadTemplates();
    setTemplates(saved);
    if (saved.length > 0) setSelectedTemplate(saved[0]);
  }, []);

  function handleContentChange(patch: Partial<ContentInput>) {
    setContentInput((prev) => ({ ...prev, ...patch }));
  }

  function handleModeChange(mode: ContentInput['mode']) {
    setContentInput((prev) => ({ ...prev, mode, subject: '', keywords: '' }));
  }

  function handleLayersParsed(layers: Pick<LayerMapping, 'nodeId' | 'layerName'>[], figmaUrl: string) {
    setParsedLayers(layers);
    setParsedFigmaUrl(figmaUrl);
  }

  function handleTemplateSave(template: Template) {
    const updated = loadTemplates();
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

  async function handleGenerate() {
    if (!selectedTemplate) return;
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

  const isGenerateDisabled = !selectedTemplate || !contentInput.subject.trim() || !contentInput.keywords.trim();

  return (
    <div className="min-h-screen bg-canvas pb-24">
      <AppHeader />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Step 1: Template */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white text-lg font-bold shadow-sm">1</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">Figma 템플릿 설정</h2>
              <p className="text-muted text-sm mt-1">사용할 Figma 파일과 레이어 역할을 정의하세요.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {templates.length > 0 && (
              <TemplateList
                templates={templates}
                selectedTemplate={selectedTemplate}
                onSelect={setSelectedTemplate}
                onDelete={handleTemplateDelete}
              />
            )}

            <TemplateRegistration onLayersParsed={handleLayersParsed} />

            {parsedLayers && parsedLayers.length > 0 && (
              <LayerMappingForm
                parsedLayers={parsedLayers}
                figmaUrl={parsedFigmaUrl}
                onSave={handleTemplateSave}
                onCancel={() => setParsedLayers(null)}
              />
            )}

            {parsedLayers?.length === 0 && (
              <EmptyState
                title="텍스트 레이어 없음"
                description="Figma 파일에 텍스트 레이어가 없습니다. 파일을 확인해주세요."
              />
            )}
          </div>
        </section>

        {/* Step 2: Content */}
        <section className="space-y-8 bg-brand-peach/5 p-8 md:p-12 rounded-xl border border-brand-peach/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-peach text-white text-lg font-bold shadow-sm">2</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">내용 입력</h2>
              <p className="text-muted text-sm mt-1">어떤 주제로 카드뉴스를 만들지 알려주세요.</p>
            </div>
          </header>

          <div className="space-y-8">
            <ModeSelector mode={contentInput.mode} onModeChange={handleModeChange} />
            <ContentInputForm contentInput={contentInput} onContentChange={handleContentChange} />
          </div>
        </section>

        {/* Step 3: Condition */}
        <section className="space-y-8 bg-brand-lavender/5 p-8 md:p-12 rounded-xl border border-brand-lavender/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-lavender text-white text-lg font-bold shadow-sm">3</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">상세 조건 설정</h2>
              <p className="text-muted text-sm mt-1">슬라이드 수와 톤앤매너를 자유롭게 조절하세요.</p>
            </div>
          </header>

          <ConditionForm contentInput={contentInput} onContentChange={handleContentChange} />
        </section>

        {/* Step 4: Generate & Result */}
        <section className="space-y-10 bg-brand-pink/5 p-8 md:p-12 rounded-xl border border-brand-pink/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-pink text-white text-lg font-bold shadow-sm">4</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">카피 생성 및 삽입</h2>
              <p className="text-muted text-sm mt-1">Claude가 생성한 카피를 확인하고 Figma로 보내세요.</p>
            </div>
          </header>

          <div className="flex flex-col gap-12">
            <GenerateButton
              isLoading={isLoading}
              disabled={isGenerateDisabled}
              onClick={handleGenerate}
            />

            {error && (
              <p className="text-sm text-red-500 text-center -mt-8" aria-live="polite">{error}</p>
            )}

            {generatedCopy && (
              <div className="space-y-8">
                <ResultPreview generatedCopy={generatedCopy} selectedTemplate={selectedTemplate} />
                <FigmaInsertButton />
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-hairline text-center">
        <p className="text-sm text-muted">© 2024 CardFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
