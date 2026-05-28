interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = '등록된 템플릿이 없어요',
  description = 'Figma 템플릿을 등록하면 여기에 표시됩니다.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <span className="text-4xl" aria-hidden="true">🗂️</span>
      <p className="text-base font-semibold text-[#0a0a0a]">{title}</p>
      <p className="text-sm text-[#6b6b6b]">{description}</p>
      {action}
    </div>
  );
}
