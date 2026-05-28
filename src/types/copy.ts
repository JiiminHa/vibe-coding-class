export interface SlideCopy {
  slideNumber: number;
  title: string;
  body: string;
  hashtags?: string[];
}

export interface GeneratedCopy {
  slides: SlideCopy[];
}
