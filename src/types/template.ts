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

export interface Template {
  id: string;
  name: string;
  figmaFileKey: string;
  figmaUrl: string;
  mappings: LayerMapping[];
  createdAt: string;
}
