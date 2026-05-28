import type { Template } from '@/types/template';

interface TemplateListProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelect: (template: Template) => void;
  onDelete: (id: string) => void;
}

export default function TemplateList({ templates, selectedTemplate, onSelect, onDelete }: TemplateListProps) {
  if (templates.length === 0) return null;

  return (
    <div className="bg-surface-card rounded-xl p-6 border border-hairline">
      <h3 className="text-sm font-semibold text-muted mb-3">저장된 템플릿</h3>
      <ul className="flex flex-col gap-2">
        {templates.map((t) => (
          <li
            key={t.id}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
              selectedTemplate?.id === t.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-hairline hover:border-brand-pink'
            }`}
            onClick={() => onSelect(t)}
          >
            <span className="text-sm font-medium">{t.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(t.id); }}
              className="text-xs opacity-60 hover:opacity-100 ml-4"
              aria-label={`${t.name} 삭제`}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
