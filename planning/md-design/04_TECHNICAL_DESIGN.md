# Technical Design

## 1. Architecture Overview

```
User (Browser)
  → Next.js App (App Router)
      → Client Components (React UI — 입력, 상태 표시)
      → Server Actions (API 키 보호, 외부 호출)
          → Anthropic SDK → Claude API  (카피 생성)
          → Figma REST API              (텍스트 삽입)
      → localStorage                   (템플릿 매핑 영속 저장)
```

**핵심 원칙**
- Claude API 키와 Figma Personal Access Token은 서버(Server Action)에서만 사용 — 클라이언트에 노출하지 않는다.
- 레이어 매핑은 DB 없이 `localStorage`에 저장한다 (단일 사용자 MVP).
- Figma MCP는 Claude Code 개발 컨텍스트에서 사용하고, 웹 앱 런타임에서는 Figma REST API를 직접 호출한다.

---

## 2. Tech Stack

| Area | Technology | 선택 이유 |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Server Action으로 API 키 보호, SSR + Client 컴포넌트 혼용 |
| UI | React 18 | Server/Client 컴포넌트 분리로 필요한 곳에만 hydration |
| Language | TypeScript (strict) | 레이어 매핑·카피 구조 타입 오류를 컴파일 타임에 차단 |
| Style | Tailwind CSS | Clay 디자인 토큰을 인라인으로 빠르게 적용 |
| AI | Anthropic SDK (`@anthropic-ai/sdk`) | Claude API 카피 생성 |
| Figma | Figma REST API (`v1/files`, `v1/files/:key/nodes`) | 서버에서 텍스트 레이어 파싱 및 삽입 |
| Storage | `localStorage` | 템플릿 매핑 저장 (DB 불필요한 단일 사용자) |
| Test | Playwright (4회차~) | E2E 핵심 흐름 검증 |
| Version Control | GitHub | 코드 이력 관리 |
| AI Coding | Claude Code | 개발 보조 + Figma MCP 연동 |

---

## 3. Route Design

| Route | File | Type | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server Component | `/app`으로 즉시 리다이렉트 |
| `/app` | `src/app/app/page.tsx` | Client Component | 메인 도구 (4단계 인터랙션) |

---

## 4. Source Structure

```text
src/
  app/
    layout.tsx                    # 루트 레이아웃, 폰트·메타데이터
    page.tsx                      # / → /app 리다이렉트
    app/
      page.tsx                    # 메인 도구 페이지 (/app)
    actions/
      generate.ts                 # Server Action: Claude API 카피 생성
      figma.ts                    # Server Action: Figma REST API 레이어 파싱 + 텍스트 삽입

  components/
    ui/                           # 재사용 가능한 범용 UI
      Button.tsx
      TextInput.tsx
      EmptyState.tsx
      ErrorFallback.tsx
      LoadingSpinner.tsx
    layout/
      AppHeader.tsx               # 앱 페이지 헤더

  features/
    template/                     # 템플릿 등록 · 관리
      types.ts
      storage.ts                  # localStorage read/write 유틸
      components/
        TemplateList.tsx
        TemplateRegistration.tsx
        LayerMappingForm.tsx
    content/                      # 내용 입력 · 조건 설정
      types.ts
      components/
        ModeSelector.tsx
        ContentInputForm.tsx
        ConditionForm.tsx
    generate/                     # 생성 · 삽입
      types.ts
      components/
        GenerateButton.tsx
        ResultPreview.tsx
        FigmaInsertButton.tsx

  types/                          # 앱 전역 공유 타입
    template.ts
    content.ts
    copy.ts
```

---

## 5. Data Models

### Template (레이어 매핑)

```ts
// src/types/template.ts

type LayerRole =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'date'
  | 'hashtag'
  | 'image'
  | 'ignore';

interface LayerMapping {
  nodeId: string;
  layerName: string;
  role: LayerRole;
}

interface Template {
  id: string;           // crypto.randomUUID()
  name: string;         // 사용자 지정 이름
  figmaFileKey: string; // Figma URL에서 파싱
  figmaUrl: string;
  mappings: LayerMapping[];
  createdAt: string;    // ISO 8601
}
```

### ContentInput (생성 입력값)

```ts
// src/types/content.ts

type Mode = 'likelion' | 'study';
type Tone = 'friendly' | 'professional' | 'emotional';

interface ContentInput {
  mode: Mode;
  subject: string;
  keywords: string;
  slideCount: number;   // 1–10
  tone: Tone;
  targetAudience: string;
  additionalRequest?: string;
  photoDataUrl?: string;
}
```

### GeneratedCopy (생성 결과)

```ts
// src/types/copy.ts

interface SlideCopy {
  slideNumber: number;
  title: string;
  body: string;
  hashtags?: string[];
}

interface GeneratedCopy {
  slides: SlideCopy[];
}
```

---

## 6. State Management

Server Action이나 외부 라이브러리 없이 **React `useState` + `useReducer`** 만 사용한다. 전역 상태 라이브러리(Zustand, Redux 등)는 MVP 범위 밖이다.

| 상태 | 위치 | 관리 방식 |
|---|---|---|
| 선택된 템플릿 | `/app/page.tsx` | `useState<Template \| null>` |
| 레이어 매핑 편집 중 | `LayerMappingForm` | `useState<LayerMapping[]>` |
| ContentInput 폼 | `/app/page.tsx` | `useState<ContentInput>` |
| 생성 결과 | `/app/page.tsx` | `useState<GeneratedCopy \| null>` |
| 로딩·에러 | `/app/page.tsx` | `useState<{ loading: boolean; error: string \| null }>` |
| 저장된 템플릿 목록 | `template/storage.ts` | localStorage ↔ `Template[]` |

---

## 7. Server Actions

### `generate.ts` — 카피 생성

```ts
// src/app/actions/generate.ts
'use server';

export async function generateCopy(
  input: ContentInput,
  template: Template
): Promise<GeneratedCopy>
```

- Anthropic SDK로 Claude API 호출
- `ANTHROPIC_API_KEY` 환경 변수 사용 (클라이언트 미노출)
- 입력값 + 레이어 매핑 구조를 프롬프트에 포함해 슬라이드별 JSON 반환

### `figma.ts` — Figma 연동

```ts
// src/app/actions/figma.ts
'use server';

export async function parseLayersFromUrl(
  figmaUrl: string
): Promise<Pick<LayerMapping, 'nodeId' | 'layerName'>[]>

export async function insertCopyToFigma(
  copy: GeneratedCopy,
  template: Template
): Promise<{ success: boolean; error?: string }>
```

- `FIGMA_ACCESS_TOKEN` 환경 변수 사용
- `parseLayersFromUrl`: Figma REST API `GET /v1/files/:key` → 텍스트 노드 추출
- `insertCopyToFigma`: Figma REST API `POST /v1/files/:key/nodes` → 텍스트 삽입

---

## 8. Storage Strategy

| 데이터 | 저장소 | 이유 |
|---|---|---|
| 템플릿 매핑 (`Template[]`) | `localStorage` | DB 없이 단일 사용자 영속 저장 |
| 생성된 카피 | 메모리 (React state) | 세션 내 임시 사용, 저장 불필요 |
| 업로드 사진 | 메모리 (`dataURL`) | Figma 이미지 슬롯 삽입 후 해제 |
| API 키 | `.env.local` | 서버에서만 접근, `.gitignore` 필수 |

---

## 9. Environment Variables

```bash
# .env.local (절대 커밋하지 않음)
ANTHROPIC_API_KEY=sk-ant-...
FIGMA_ACCESS_TOKEN=figd_...
```

`.env.local`은 `.gitignore`에 반드시 포함해야 한다.  
공개 저장소에 커밋할 경우 키를 즉시 교체해야 한다.

---

## 10. Key Technical Decisions

| 결정 | 대안 | 선택 이유 |
|---|---|---|
| Server Action으로 API 호출 | API Route(`/api/...`) | 보일러플레이트 감소, 타입 공유 용이 |
| localStorage 영속화 | DB (Supabase 등) | 단일 사용자 MVP — DB 셋업 오버헤드 제거 |
| Figma REST API | Figma MCP (런타임) | 웹 앱 런타임에서 MCP 직접 호출 불가; REST API가 명확한 대안 |
| 전역 상태 라이브러리 없음 | Zustand, Redux | 컴포넌트 수가 적어 `useState`로 충분 |
| `any` 금지, `unknown` 사용 | `any` | 런타임 에러를 컴파일 타임에 잡기 위해 strict 유지 |
