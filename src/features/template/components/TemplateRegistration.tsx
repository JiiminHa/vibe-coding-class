'use client';

import { useState } from 'react';
import type { ParsedLayer } from '@/types/template';
import { parseFigmaLayers } from '@/app/actions/figma';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';

interface TemplateRegistrationProps {
  onLayersParsed: (layers: ParsedLayer[], figmaUrl: string) => void;
}

export default function TemplateRegistration({ onLayersParsed }: TemplateRegistrationProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleParse() {
    if (!url.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const layers = await parseFigmaLayers(url.trim());
      onLayersParsed(layers, url.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : '레이어 파싱에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-surface-card rounded-xl p-8 border border-hairline">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Figma 템플릿 등록하기</h2>
        <p className="text-muted mb-6">Figma 파일 URL을 입력하여 레이어를 파싱하고 매핑을 시작하세요.</p>

        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <TextInput
              label="Figma URL"
              placeholder="https://www.figma.com/design/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button
            onClick={handleParse}
            disabled={isLoading || !url.trim()}
            className="whitespace-nowrap"
          >
            {isLoading ? '파싱 중...' : '레이어 불러오기'}
          </Button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500" aria-live="polite">{error}</p>
        )}
      </div>
    </div>
  );
}
