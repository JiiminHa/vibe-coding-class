'use server';

import Anthropic from '@anthropic-ai/sdk';
import type { ContentInput } from '@/types/content';
import type { GeneratedCopy, SlideCopy } from '@/types/copy';
import type { Template, LayerRole } from '@/types/template';

const TONE_LABEL: Record<string, string> = {
  friendly: '친근하고 편안한',
  professional: '전문적이고 신뢰감 있는',
  emotional: '감성적이고 공감 가는',
};

const MODE_LABEL: Record<string, string> = {
  likelion: '멋쟁이사자처럼 홍보',
  study: '공부 기록 인스타',
};

function buildActiveRoles(template: Template): LayerRole[] {
  const seen = new Set<LayerRole>();
  for (const m of template.mappings) {
    if (m.role !== 'ignore' && m.role !== 'image') seen.add(m.role);
  }
  return [...seen];
}

function buildPrompt(input: ContentInput, template: Template): string {
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

export async function generateCopy(input: ContentInput, template: Template): Promise<GeneratedCopy> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: buildPrompt(input, template) }],
  });

  const raw = message.content[0];
  if (raw.type !== 'text') throw new Error('Claude API에서 예상치 못한 응답 형식을 받았습니다.');

  // JSON 파싱 — 마크다운 코드블록 감싸져 있을 수 있으므로 추출
  const jsonMatch = raw.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude 응답에서 JSON을 찾을 수 없습니다.');

  const parsed = JSON.parse(jsonMatch[0]) as unknown;

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('slides' in parsed) ||
    !Array.isArray((parsed as Record<string, unknown>).slides)
  ) {
    throw new Error('카피 생성 결과 형식이 올바르지 않습니다.');
  }

  const slides = ((parsed as Record<string, unknown>).slides as unknown[]).map((s, i): SlideCopy => {
    const slide = s as Record<string, unknown>;
    return {
      slideNumber: typeof slide.slideNumber === 'number' ? slide.slideNumber : i + 1,
      title: typeof slide.title === 'string' ? slide.title : '',
      body: typeof slide.body === 'string' ? slide.body : '',
      hashtags: Array.isArray(slide.hashtags) ? (slide.hashtags as string[]) : [],
    };
  });

  return { slides };
}
