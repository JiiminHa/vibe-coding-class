'use client';

export default function FigmaInsertButton() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 border-t border-hairline mt-4">
      <p className="text-sm text-muted text-center">
        위 <strong>클립보드 복사</strong> 버튼으로 카피를 복사한 뒤, Figma에서 CardFlow 플러그인을 실행해 붙여넣으세요.
      </p>
      <div className="flex items-center gap-2 text-xs text-muted bg-surface-card px-4 py-2 rounded-lg border border-hairline">
        <span>①</span><span>클립보드 복사</span>
        <span className="text-hairline">→</span>
        <span>②</span><span>Figma 열기</span>
        <span className="text-hairline">→</span>
        <span>③</span><span>CardFlow 플러그인 실행</span>
      </div>
    </div>
  );
}
