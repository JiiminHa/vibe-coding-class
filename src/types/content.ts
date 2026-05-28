export type Mode = 'likelion' | 'study';
export type Tone = 'friendly' | 'professional' | 'emotional';

export interface ContentInput {
  mode: Mode;
  subject: string;
  keywords: string;
  slideCount: number;
  tone: Tone;
  targetAudience: string;
  additionalRequest?: string;
  photoDataUrl?: string;
}
