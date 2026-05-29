import type { Mode, Tone } from '@/types/content';

export const MODE_META: Record<Mode, { label: string; desc: string }> = {
  likelion: {
    label: '멋사 홍보',
    desc: '멋쟁이사자처럼 행사·모집·활동을 홍보하는 카드뉴스를 만들어요.',
  },
  study: {
    label: '공부 기록',
    desc: '공부한 내용을 요약·정리해서 지식을 공유하는 카드뉴스를 만들어요.',
  },
};

export const TONE_LABEL: Record<Tone, string> = {
  friendly: '친근하고 편안한',
  professional: '전문적이고 신뢰감 있는',
  emotional: '감성적이고 공감 가는',
};

export const MODE_LABEL: Record<Mode, string> = {
  likelion: '멋쟁이사자처럼 홍보',
  study: '공부 기록 인스타',
};

export const DEFAULT_CONTENT_VALUES = {
  mode: 'likelion' as Mode,
  subject: '',
  keywords: '',
  slideCount: 5,
  tone: 'friendly' as Tone,
  targetAudience: '',
  additionalRequest: '',
};
