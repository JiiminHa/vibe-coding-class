'use server';

import type { LayerMapping } from '@/types/template';
import type { GeneratedCopy } from '@/types/copy';
import type { Template } from '@/types/template';

// Figma REST API 응답 노드 타입
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

interface FigmaFileResponse {
  document: FigmaNode;
}

function extractFileKey(figmaUrl: string): string {
  const match = figmaUrl.match(/figma\.com\/(?:design|file)\/([^/?#]+)/);
  if (!match) throw new Error('유효하지 않은 Figma URL입니다. figma.com/design/... 또는 figma.com/file/... 형식이어야 합니다.');
  return match[1];
}

function collectTextNodes(node: FigmaNode, result: Pick<LayerMapping, 'nodeId' | 'layerName'>[] = []): Pick<LayerMapping, 'nodeId' | 'layerName'>[] {
  if (node.type === 'TEXT' && node.name) {
    result.push({ nodeId: node.id, layerName: node.name });
  }
  if (node.children) {
    for (const child of node.children) {
      collectTextNodes(child, result);
    }
  }
  return result;
}

export async function parseFigmaLayers(figmaUrl: string): Promise<Pick<LayerMapping, 'nodeId' | 'layerName'>[]> {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) throw new Error('FIGMA_ACCESS_TOKEN 환경 변수가 설정되지 않았습니다.');

  const fileKey = extractFileKey(figmaUrl);

  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: { 'X-Figma-Token': token },
  });

  if (res.status === 401) throw new Error('Figma 접근 권한이 없습니다. 토큰을 확인해주세요.');
  if (res.status === 404) throw new Error('Figma 파일을 찾을 수 없습니다. URL을 확인해주세요.');
  if (!res.ok) throw new Error(`Figma API 오류: ${res.status}`);

  const data = (await res.json()) as unknown;

  // 타입 좁히기
  if (
    typeof data !== 'object' ||
    data === null ||
    !('document' in data) ||
    typeof (data as Record<string, unknown>).document !== 'object'
  ) {
    throw new Error('Figma API 응답 형식이 올바르지 않습니다.');
  }

  const { document } = data as FigmaFileResponse;
  return collectTextNodes(document);
}

// REST API는 텍스트 쓰기 불가 — 클립보드 방식으로 대체됨
// 이 함수는 타입 호환성을 위해 유지
export async function insertCopyToFigma(
  _template: Template,
  _copy: GeneratedCopy,
): Promise<void> {
  throw new Error('Figma REST API는 텍스트 쓰기를 지원하지 않습니다. 클립보드 복사 후 Figma 플러그인을 사용하세요.');
}
