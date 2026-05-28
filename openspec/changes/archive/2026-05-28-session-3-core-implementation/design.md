## Context

2회차 완료 시점 상태:
- `src/types/*.ts` — Template, ContentInput, GeneratedCopy 타입 정의 완료
- `src/app/app/page.tsx` — 4단계 Shell 존재, 컴포넌트 import만 있고 상태/props 연결 없음
- `src/app/actions/generate.ts` — stub (throw Error)
- `src/app/actions/figma.ts` — stub (throw Error)
- `src/features/**/components/*.tsx` — Placeholder UI 존재

핵심 제약:
- Figma REST API는 Read-Only. 텍스트 쓰기 불가.
- API 키(`ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN`)는 Server Action 내에서만 사용.
- 단일 사용자 MVP — 전역 상태 라이브러리 없이 `useState`만 사용.

## Goals / Non-Goals

**Goals:**
- `app/page.tsx`에서 4단계 상태를 통합 관리하고 props로 흘리기
- `parseFigmaLayers` — Figma REST API GET으로 텍스트 레이어 파싱
- `generateCopy` — Anthropic SDK, Template + ContentInput → 슬라이드별 JSON
- ResultPreview에 클립보드 복사 기능 추가
- (Should) Figma Plugin 프로젝트로 실제 텍스트 삽입

**Non-Goals:**
- 로그인 / 권한 관리
- DB 연동 (localStorage 유지)
- Figma REST API 텍스트 쓰기 (불가능)
- PNG 내보내기
- 다중 템플릿 동시 편집

## Decisions

### 1. 상태 관리: app/page.tsx 중앙 집중 + props drilling

**결정**: 전역 상태 라이브러리 없이 `app/page.tsx`에서 모든 상태를 들고 각 컴포넌트에 props로 전달.

**이유**: 컴포넌트 수가 10개 이하이고 단방향 4단계 흐름이라 Context 불필요. Zustand 등 추가 의존성을 피함.

**상태 구조**:
```ts
// app/page.tsx
const [templates, setTemplates] = useState<Template[]>([]);
const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
const [contentInput, setContentInput] = useState<ContentInput>(defaultContentInput);
const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**대안 고려**: React Context — 컴포넌트 수가 적어 오버엔지니어링.

---

### 2. generateCopy 시그니처: Template 인자 포함

**결정**: `generateCopy(input: ContentInput, template: Template): Promise<GeneratedCopy>`

**이유**: Claude 프롬프트에 레이어 구조(title/body/hashtag 등)를 포함해야 슬라이드별 JSON을 올바른 구조로 생성 가능.

**프롬프트 전략**: template.mappings를 role 단위로 정리해서 "이 템플릿에는 title, body, hashtag 레이어가 있습니다. 각 슬라이드를 JSON으로 작성해주세요" 형태로 구조화.

---

### 3. FR-008 대체: 클립보드 JSON + Figma Plugin

**결정**: Figma REST API 텍스트 삽입 대신 클립보드 JSON 복사 방식 채택.

**클립보드 JSON 포맷**:
```json
{
  "cardflow": true,
  "templateId": "abc123",
  "slides": [
    {
      "slideNumber": 1,
      "layers": [
        { "nodeId": "123:456", "role": "title", "text": "카피 내용" }
      ]
    }
  ]
}
```

**Figma Plugin 아키텍처**:
```
ui.html (iframe)
  → navigator.clipboard.readText()
  → JSON.parse()
  → postMessage to code.ts

code.ts (Figma sandbox)
  → figma.getNodeById(nodeId) as TextNode
  → figma.loadFontAsync(node.fontName)
  → node.characters = text
```

**두 컨텍스트 분리**: Figma Plugin은 ui.html(DOM 접근 가능)과 code.ts(Figma API 접근 가능)가 `postMessage`로 통신. 클립보드 읽기는 ui.html에서, 노드 수정은 code.ts에서.

**대안 고려**: 
- 서버 경유 token 방식 — 추가 스토리지 필요, MVP 범위 초과
- Figma Variables API — Enterprise 전용, 비용 과다

---

### 4. parseFigmaLayers 구현 전략

**결정**: `GET /v1/files/:key` 응답에서 재귀적으로 type === "TEXT" 노드만 추출.

**이유**: `/v1/files/:key/nodes`는 특정 nodeId를 알 때 사용. 최초 파싱 시에는 전체 파일을 순회해야 함.

**필터링**: `node.type === "TEXT"` 이고 `node.name`이 존재하는 것만 반환. `ignore` role은 UI에서 사용자가 지정.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Figma API 레이트 리밋 (파일 파싱 시) | MVP는 단일 사용자 — 실제 문제 발생 가능성 낮음 |
| 폰트 로드 실패 (`figma.loadFontAsync`) | try-catch로 폰트 로드 실패 시 해당 레이어 건너뜀, 사용자에게 실패 레이어 목록 표시 |
| 클립보드 접근 권한 거부 (브라우저) | HTTPS 환경 또는 localhost에서만 clipboard API 동작 — Vercel 배포 시 자동 해결 |
| 대형 Figma 파일 파싱 속도 | 텍스트 노드만 필터링하므로 응답은 받지만 처리가 느릴 수 있음. MVP에서는 허용 |
| Figma Plugin 플러그인 경험 없음 | postMessage 패턴만 익히면 됨 — ui.html / code.ts 역할 분리가 핵심 |

## Open Questions

- `generateCopy` 프롬프트: Claude에게 슬라이드별 JSON을 어떤 포맷으로 요청할 것인가? (structured output vs 마크다운 파싱)
  - 권장: `response_format`으로 JSON 스키마 강제 또는 `<json>` 태그 파싱
- Figma Plugin 배포: 로컬 개발용으로만 쓸 것인가, Figma Community에 배포할 것인가?
  - MVP는 로컬(Development plugin)으로 충분
