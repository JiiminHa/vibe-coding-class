export type LayerRole =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'date'
  | 'hashtag'
  | 'image'
  | 'ignore';

export interface LayerMapping {
  nodeId: string;
  layerName: string;
  role: LayerRole;
}

/** Figma REST API 파싱 직후, role 매핑 전 상태 */
export type ParsedLayer = Pick<LayerMapping, 'nodeId' | 'layerName'>;

export interface Template {
  id: string;
  name: string;
  figmaFileKey: string;
  figmaUrl: string;
  mappings: LayerMapping[];
  createdAt: string;
}
