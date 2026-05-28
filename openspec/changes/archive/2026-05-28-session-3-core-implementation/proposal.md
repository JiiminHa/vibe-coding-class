## Why

2회차에서 완성된 scaffold(타입·Shell·Placeholder)를 실제 동작하는 MVP로 완성한다. 조사 결과 Figma REST API는 Read-Only로 텍스트 삽입이 불가능함을 확인, FR-008 설계를 클립보드 JSON + Figma Plugin 방식으로 수정한다.

## What Changes

- `app/page.tsx` 상태 전체 wiring — Template 선택 → ContentInput → GeneratedCopy 흐름 연결 (현재 컴포넌트들이 isolated 상태)
- `actions/generate.ts` — Anthropic SDK로 `generateCopy` 구현, `Template` 인자 추가 (설계 문서와 시그니처 불일치 수정)
- `actions/figma.ts` — Figma REST API `GET /v1/files/:key`로 `parseFigmaLayers` 구현
- `features/generate/components/ResultPreview.tsx` — "클립보드 복사" 버튼 추가, 클립보드 JSON 포맷으로 카피 복사
- **BREAKING** `FR-008` 수정 — Figma REST API 텍스트 삽입(불가능) → 클립보드 JSON 복사 + Figma Plugin 삽입으로 대체
- `cardflow-figma-plugin/` 신규 프로젝트 — Figma Plugin API로 클립보드 JSON 읽어서 TextNode에 삽입 (Should Have)

## Capabilities

### New Capabilities

- `copy-generation`: Claude API(Anthropic SDK)로 슬라이드별 카피를 자동 생성하는 기능. ContentInput + Template을 프롬프트에 포함해 구조화된 JSON 반환.
- `figma-layer-parsing`: Figma REST API GET으로 파일의 텍스트 레이어를 파싱하는 기능.
- `clipboard-export`: 생성된 카피를 Figma Plugin이 소비할 수 있는 JSON 포맷으로 클립보드에 복사하는 기능.
- `app-state-wiring`: app/page.tsx에서 4단계 흐름의 상태를 연결하고 props로 각 컴포넌트에 전달하는 기능.
- `figma-plugin-insert`: Figma Plugin이 클립보드 JSON을 읽어 nodeId로 TextNode를 찾고 Plugin API로 텍스트를 삽입하는 기능 (Should Have).

### Modified Capabilities

## Impact

- `src/app/app/page.tsx` — 상태 추가 및 전체 컴포넌트 props 연결
- `src/app/actions/generate.ts` — Anthropic SDK 의존성 추가, 시그니처 수정
- `src/app/actions/figma.ts` — Figma REST API 호출 구현
- `src/features/generate/components/ResultPreview.tsx` — 클립보드 복사 버튼 추가
- `src/features/generate/components/FigmaInsertButton.tsx` — 역할 변경 (REST API 삽입 → 안내 UI)
- `cardflow-figma-plugin/` — 신규 프로젝트 (별도 manifest.json, TypeScript)
- `.env.local` — `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` 필요
