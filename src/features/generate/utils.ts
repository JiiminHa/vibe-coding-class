import type { GeneratedCopy } from '@/types/copy';
import type { Template } from '@/types/template';

export interface ClipboardLayer {
  nodeId: string;
  role: string;
  text: string;
}

export interface ClipboardSlide {
  slideNumber: number;
  layers: ClipboardLayer[];
}

export interface ClipboardJson {
  cardflow: true;
  templateId: string;
  slides: ClipboardSlide[];
}

export function buildClipboardJson(copy: GeneratedCopy, template: Template): ClipboardJson {
  const activeMappings = template.mappings.filter((m) => m.role !== 'ignore' && m.role !== 'image');

  const slides: ClipboardSlide[] = copy.slides.map((slide) => {
    const layers: ClipboardLayer[] = activeMappings.map((mapping) => {
      let text = '';
      if (mapping.role === 'title') text = slide.title;
      else if (mapping.role === 'body' || mapping.role === 'subtitle') text = slide.body;
      else if (mapping.role === 'hashtag') text = (slide.hashtags ?? []).join(' ');
      return { nodeId: mapping.nodeId, role: mapping.role, text };
    });

    return { slideNumber: slide.slideNumber, layers };
  });

  return { cardflow: true, templateId: template.id, slides };
}
