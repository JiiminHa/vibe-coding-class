'use client';

import type { ContentInput } from '@/types/content';
import type { Template } from '@/types/template';
import { useTemplateState } from '@/features/template/hooks/useTemplateState';
import { useGenerateState } from '@/features/generate/hooks/useGenerateState';
import { useContentInput } from '@/features/content/hooks/useContentInput';
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
import FigmaInsertGuide from '@/features/generate/components/FigmaInsertGuide';

export default function AppPage() {
  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    parsedLayers,
    parsedFigmaUrl,
    handleLayersParsed,
    handleTemplateSave,
    handleTemplateDelete,
    clearParsedLayers,
  } = useTemplateState();

  const { generatedCopy, isLoading, error, handleGenerate } = useGenerateState();
  const { contentInput, handleContentChange, handleModeChange } = useContentInput();

  const isGenerateDisabled =
    !selectedTemplate ||
    !contentInput.subject.trim() ||
    !contentInput.keywords.trim();

  const generateDisabledReason = getDisabledReason(selectedTemplate, contentInput);

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
                onCancel={clearParsedLayers}
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
        <section className={`space-y-8 bg-brand-peach/5 p-8 md:p-12 rounded-xl border border-brand-peach/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 transition-opacity ${!selectedTemplate ? 'opacity-40 pointer-events-none select-none' : ''}`}>
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-peach text-white text-lg font-bold shadow-sm">2</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">내용 입력</h2>
              <p className="text-muted text-sm mt-1">어떤 주제로 카드뉴스를 만들지 알려주세요.</p>
            </div>
          </header>

          <div className="space-y-8">
            <ModeSelector mode={contentInput.mode} onModeChange={handleModeChange} />
            <ContentInputForm
              subject={contentInput.subject}
              keywords={contentInput.keywords}
              photoDataUrl={contentInput.photoDataUrl}
              onContentChange={handleContentChange}
            />
          </div>
        </section>

        {/* Step 3: Condition */}
        <section className={`space-y-8 bg-brand-lavender/5 p-8 md:p-12 rounded-xl border border-brand-lavender/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 transition-opacity ${!selectedTemplate ? 'opacity-40 pointer-events-none select-none' : ''}`}>
          <header className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-lavender text-white text-lg font-bold shadow-sm">3</span>
            <div>
              <h2 className="text-2xl font-bold text-ink leading-tight">상세 조건 설정</h2>
              <p className="text-muted text-sm mt-1">슬라이드 수와 톤앤매너를 자유롭게 조절하세요.</p>
            </div>
          </header>

          <ConditionForm
            slideCount={contentInput.slideCount}
            tone={contentInput.tone}
            targetAudience={contentInput.targetAudience}
            additionalRequest={contentInput.additionalRequest}
            onContentChange={handleContentChange}
          />
        </section>

        {/* Step 4: Generate & Result */}
        <section className={`space-y-10 bg-brand-pink/5 p-8 md:p-12 rounded-xl border border-brand-pink/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 transition-opacity ${!selectedTemplate ? 'opacity-40 pointer-events-none select-none' : ''}`}>
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
              disabledReason={generateDisabledReason}
              onClick={() => selectedTemplate && handleGenerate(contentInput, selectedTemplate)}
            />

            {error && (
              <p className="text-sm text-red-500 text-center -mt-8" aria-live="polite">{error}</p>
            )}

            {generatedCopy && (
              <div className="space-y-8">
                <ResultPreview generatedCopy={generatedCopy} selectedTemplate={selectedTemplate} />
                <FigmaInsertGuide />
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-hairline text-center">
        <p className="text-sm text-muted">© {new Date().getFullYear()} CardFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ── 순수 유틸 ─────────────────────────────────────────────────────────────
function getDisabledReason(
  selectedTemplate: Template | null,
  contentInput: ContentInput,
): string | undefined {
  if (!selectedTemplate) return '1단계에서 Figma 템플릿을 먼저 선택하세요.';
  if (!contentInput.subject.trim()) return '2단계에서 카드뉴스 주제를 입력하세요.';
  if (!contentInput.keywords.trim()) return '2단계에서 핵심 키워드를 입력하세요.';
  return undefined;
}
