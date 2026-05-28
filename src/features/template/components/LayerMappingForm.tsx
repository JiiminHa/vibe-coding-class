'use client';

import { useState } from 'react';
import type { LayerMapping, LayerRole, ParsedLayer, Template } from '@/types/template';
import { saveTemplates, loadTemplates } from '../storage';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';

const ROLES: { value: LayerRole; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'subtitle', label: '소제목' },
  { value: 'body', label: '본문' },
  { value: 'date', label: '날짜' },
  { value: 'hashtag', label: '해시태그' },
  { value: 'image', label: '이미지' },
  { value: 'ignore', label: '무시' },
];

interface LayerMappingFormProps {
  parsedLayers: ParsedLayer[];
  figmaUrl: string;
  onSave: (template: Template) => void;
  onCancel: () => void;
}

export default function LayerMappingForm({ parsedLayers, figmaUrl, onSave, onCancel }: LayerMappingFormProps) {
  const [templateName, setTemplateName] = useState('');
  const [roles, setRoles] = useState<Record<string, LayerRole>>(
    Object.fromEntries(parsedLayers.map((l) => [l.nodeId, 'ignore' as LayerRole]))
  );

  function handleRoleChange(nodeId: string, role: LayerRole) {
    setRoles((prev) => ({ ...prev, [nodeId]: role }));
  }

  function handleSave() {
    const fileKeyMatch = figmaUrl.match(/figma\.com\/(?:design|file)\/([^/]+)/);
    const figmaFileKey = fileKeyMatch?.[1] ?? '';

    const mappings: LayerMapping[] = parsedLayers.map((l) => ({
      nodeId: l.nodeId,
      layerName: l.layerName,
      role: roles[l.nodeId] ?? 'ignore',
    }));

    const template: Template = {
      id: crypto.randomUUID(),
      name: templateName.trim() || '새 템플릿',
      figmaFileKey,
      figmaUrl,
      mappings,
      createdAt: new Date().toISOString(),
    };

    const updated = [...loadTemplates(), template];
    saveTemplates(updated);
    onSave(template);
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-hairline shadow-sm">
      <h3 className="text-xl font-semibold mb-6">레이어 역할 매핑</h3>

      <div className="mb-6">
        <TextInput
          label="템플릿 이름"
          placeholder="예: 멋사 홍보 카드"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>

      <div className="space-y-3 mb-8">
        {parsedLayers.map((layer) => (
          <div key={layer.nodeId} className="flex items-center justify-between p-4 rounded-lg bg-canvas border border-hairline">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary">{layer.layerName}</span>
              <span className="text-xs text-muted">ID: {layer.nodeId}</span>
            </div>
            <select
              className="bg-white border border-hairline rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/40"
              value={roles[layer.nodeId] ?? 'ignore'}
              onChange={(e) => handleRoleChange(layer.nodeId, e.target.value as LayerRole)}
            >
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>취소</Button>
        <Button onClick={handleSave}>매핑 저장하기</Button>
      </div>
    </div>
  );
}
