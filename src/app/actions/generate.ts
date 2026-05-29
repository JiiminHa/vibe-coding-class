'use server';

import Anthropic from '@anthropic-ai/sdk';
import type { ContentInput } from '@/types/content';
import type { GeneratedCopy, SlideCopy } from '@/types/copy';
import type { Template } from '@/types/template';
import { buildPrompt } from '@/features/generate/prompt';

export async function generateCopy(input: ContentInput, template: Template): Promise<GeneratedCopy> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY가 설정되지 않았습니다. 로컬에서 실행하세요.');

  const client = new Anthropic({ apiKey });

  const userContent: Anthropic.MessageParam['content'] = input.photoDataUrl
    ? [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: input.photoDataUrl.split(';')[0].split(':')[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
            data: input.photoDataUrl.split(',')[1],
          },
        },
        { type: 'text', text: `위 이미지를 참고해서 카피를 작성해주세요.\n\n${buildPrompt(input, template)}` },
      ]
    : buildPrompt(input, template);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: userContent }],
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
