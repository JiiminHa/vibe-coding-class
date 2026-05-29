import type { ContentInput } from '@/types/content';
import type { Template, LayerRole } from '@/types/template';
import { TONE_LABEL, MODE_LABEL } from '@/features/content/constants';

export function buildActiveRoles(template: Template): LayerRole[] {
  const seen = new Set<LayerRole>();
  for (const m of template.mappings) {
    if (m.role !== 'ignore' && m.role !== 'image') seen.add(m.role);
  }
  return [...seen];
}

export function buildPrompt(input: ContentInput, template: Template): string {
  const activeRoles = buildActiveRoles(template);
  const tone = TONE_LABEL[input.tone] ?? input.tone;
  const mode = MODE_LABEL[input.mode] ?? input.mode;

  return `당신은 카드뉴스 카피라이터입니다. 아래 조건에 맞게 슬라이드별 카피를 작성해주세요.

## 조건
- 목적: ${mode}
- 주제: ${input.subject}
- 핵심 키워드: ${input.keywords}
- 슬라이드 수: ${input.slideCount}장
- 톤앤매너: ${tone}
- 타겟 독자: ${input.targetAudience || '일반 대학생'}
${input.additionalRequest ? `- 추가 요청: ${input.additionalRequest}` : ''}

## 사용할 레이어 역할
${activeRoles.map((r) => `- ${r}`).join('\n')}

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

{
  "slides": [
    {
      "slideNumber": 1,
      "title": "슬라이드 제목",
      "body": "슬라이드 본문 내용",
      "hashtags": ["해시태그1", "해시태그2"]
    }
  ]
}

- slideNumber는 1부터 ${input.slideCount}까지
- title: 짧고 임팩트 있게 (20자 이내)
- body: 핵심 메시지를 2-3문장으로
- hashtags: 3-5개, '#' 없이 단어만
- hashtags는 ${activeRoles.includes('hashtag') ? '포함' : '빈 배열 []로'}`;
}
