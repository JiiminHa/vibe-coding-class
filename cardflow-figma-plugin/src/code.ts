/// <reference types="@figma/plugin-typings" />

interface LayerData {
  nodeId: string;
  role: string;
  text: string;
}

interface SlideData {
  slideNumber: number;
  layers: LayerData[];
}

interface CardFlowData {
  cardflow: true;
  templateId: string;
  slides: SlideData[];
}

figma.showUI(__html__, { width: 280, height: 200 });

figma.ui.onmessage = async (msg: { type: string; data?: CardFlowData }) => {
  if (msg.type !== 'apply' || !msg.data) return;

  const failed: string[] = [];

  for (const slide of msg.data.slides) {
    for (const layer of slide.layers) {
      // nodeId로 노드 탐색 (Figma nodeId는 "123:456" 형식)
      const node = figma.getNodeById(layer.nodeId);

      if (!node) {
        failed.push(`슬라이드 ${slide.slideNumber} — ${layer.role} (노드 없음)`);
        continue;
      }

      if (node.type !== 'TEXT') {
        failed.push(`슬라이드 ${slide.slideNumber} — ${layer.role} (TextNode 아님)`);
        continue;
      }

      const textNode = node as TextNode;

      // 폰트 로드 후 텍스트 삽입
      try {
        const fontName = textNode.fontName;
        if (fontName === figma.mixed) {
          // 혼합 폰트: 첫 번째 문자의 폰트로 로드
          await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        } else {
          await figma.loadFontAsync(fontName as FontName);
        }
        textNode.characters = layer.text;
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : String(e);
        failed.push(`슬라이드 ${slide.slideNumber} — ${layer.role} (폰트 로드 실패: ${errorMsg})`);
      }
    }
  }

  figma.ui.postMessage({ type: 'done', failed });
};
