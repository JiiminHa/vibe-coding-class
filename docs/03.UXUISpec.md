# UX / UI Spec

## 1. Design Reference

Follow:

- [DESIGN.md](./DESIGN.md) — Clay.com 스타일 시스템 (크림 캔버스, 포화 브랜드 컬러 카드, Plain Black 디스플레이 타입)

### Design Tokens (핵심 요약)

| Token | Value | 용도 |
|---|---|---|
| `{colors.canvas}` | #fffaf0 | 기본 페이지 배경 |
| `{colors.primary}` | #0a0a0a | 기본 CTA 버튼, 제목 텍스트 |
| `{colors.brand-pink}` | #ff4d8b | 생성 액션 강조 카드 |
| `{colors.brand-teal}` | #1a3a3a | 완료/성공 상태 카드 |
| `{colors.brand-lavender}` | #b8a4ed | 조건 설정 섹션 카드 |
| `{colors.brand-peach}` | #ffb084 | 콘텐츠 입력 섹션 카드 |
| `{colors.surface-card}` | #f5f0e0 | 보조 카드, 템플릿 목록 |
| `{colors.hairline}` | #e5e5e5 | 입력창·카드 1px 테두리 |
| `{rounded.md}` | 12px | 버튼, 텍스트 입력창 |
| `{rounded.xl}` | 24px | 피처 카드 |

---

## 2. Screen Map

| Screen | Route | Purpose |
|---|---|---|
| App Page | `/app` | 4단계 흐름(템플릿 등록 → 내용 입력 → 조건 설정 → 생성·삽입) 실행 |

> `/`는 `/app`으로 리다이렉트한다. 단일 사용자 개인 툴이므로 별도 랜딩 페이지는 없다.

---

## 3. App Page (`/app`)

### Purpose

사용자가 실제 기능을 수행하는 화면이다. 4단계 흐름을 단일 스크롤 페이지에서 순서대로 진행한다.

### Required Areas

| Area | 설명 |
|---|---|
| AppHeader | 페이지 제목("CardFlow") + 간단 설명 문구 |
| TemplatePanel | 등록된 템플릿 선택 목록 또는 신규 등록 진입점 |
| LayerMappingPanel | Figma URL 입력 → 레이어 파싱 → 역할 매핑 UI |
| ContentInputForm | 모드 선택(멋사 홍보/공부 기록) + 주제·키워드 입력 + 사진 업로드 |
| ConditionForm | 슬라이드 수 · 톤앤매너 · 타겟 독자 · 추가 요청 입력 |
| GenerateArea | 생성 버튼 + 로딩 스피너 + 진행 상태 텍스트 |
| ResultPreview | 생성된 슬라이드별 카피 확인 + Figma 삽입 버튼 |
| EmptyState | 템플릿 미등록 시 등록 유도 안내 |
| ErrorFallback | Figma 삽입 실패 시 카피 텍스트 수동 복사 영역 |

### Area Details

**TemplatePanel**
- 저장된 템플릿이 있으면: `feature-card-cream` 카드로 목록 표시, 선택 가능
- 저장된 템플릿이 없으면: EmptyState로 전환 (등록 버튼 포함)

**LayerMappingPanel**
- Figma URL 텍스트 입력창 (`{component.text-input}`)
- "레이어 불러오기" 버튼 클릭 시 → 파싱된 레이어 목록 표시
- 각 레이어 행에 역할 드롭다운 (제목 / 소제목 / 본문 / 날짜 / 해시태그 / 무시)
- "저장" 버튼 → 매핑 로컬 저장

**ContentInputForm**
- 모드 선택: pill 형태 탭 (`{component.category-tab}`) — 멋사 홍보 / 공부 기록
- 주제 텍스트 입력 (한 줄)
- 키워드 텍스트 입력 (쉼표 구분)
- 사진 업로드: 드래그 앤 드롭 영역 또는 파일 선택 버튼

**ConditionForm**
- 슬라이드 수: 숫자 입력 or 스텝퍼 (최소 1, 최대 10)
- 톤앤매너: 드롭다운 (친근하게 / 전문적으로 / 감성적으로)
- 타겟 독자: 짧은 텍스트 입력
- 추가 요청: 멀티라인 텍스트 영역 (선택)

**GenerateArea**
- "카피 생성하기" 버튼 (`{component.button-primary}`)
- 로딩 중: 버튼 비활성화 + 스피너 + "Claude가 카피를 작성 중이에요..." 텍스트
- 생성 완료 → ResultPreview로 전환

**ResultPreview**
- 슬라이드 번호별 카피 카드 나열 (`feature-card-cream`)
- 각 카드에 슬라이드 제목·본문 표시
- "Figma에 삽입하기" 버튼 (`{component.button-primary}`)
- 삽입 성공: 완료 토스트 메시지
- 삽입 실패: ErrorFallback 표시

**EmptyState**
- 아이콘 + "등록된 템플릿이 없어요" 텍스트 + "Figma 템플릿 등록하기" 버튼

**ErrorFallback**
- 오류 메시지 + 생성된 카피 전체를 복사 가능한 텍스트 영역으로 표시

---

## 4. Component Plan

| Component | Purpose | Requirement Link |
|---|---|---|
| `AppHeader` | 페이지 제목과 1줄 설명 | — |
| `TemplateList` | 저장된 Figma 템플릿 목록 표시 및 선택 | FR-010 |
| `TemplateRegistration` | Figma URL 입력 및 등록 진입 | FR-001 |
| `LayerMappingForm` | 파싱된 레이어에 역할 매핑 및 저장 | FR-002, FR-003, FR-004 |
| `ModeSelector` | 멋사 홍보 / 공부 기록 모드 탭 선택 | FR-005 |
| `ContentInputForm` | 주제·키워드·사진 입력 폼 | FR-006, FR-009 |
| `ConditionForm` | 슬라이드 수·톤·타겟·추가 요청 입력 | FR-006 |
| `GenerateButton` | 카피 생성 실행 및 로딩 상태 표시 | FR-007 |
| `ResultPreview` | 생성된 슬라이드별 카피 확인 카드 | FR-007, FR-008 |
| `FigmaInsertButton` | Figma MCP 삽입 실행 버튼 | FR-008 |
| `EmptyState` | 템플릿 미등록 상태 안내 | FR-010 |
| `ErrorFallback` | Figma 삽입 실패 시 수동 복사 영역 | FR-011 |

---

## 5. Interaction Rules

- 필수 입력값(주제·키워드)이 비어 있으면 생성 버튼을 눌러도 동작하지 않는다. 비어 있는 필드에 에러 표시가 나타난다.
- 생성 버튼 클릭 후 Claude API 응답 전까지 버튼은 비활성화 상태를 유지한다.
- Figma 삽입 성공 시 3초 토스트 메시지를 표시한 뒤 자동 소멸한다.
- Figma 삽입 실패 시 ErrorFallback이 ResultPreview 아래에 즉시 노출된다.
- 모드를 변경하면 주제·키워드 입력창이 초기화된다.
- 레이어 매핑 저장 후 다음 사용 시 해당 매핑이 자동으로 로드된다.
- 사진 업로드는 드래그 앤 드롭 또는 파일 선택 두 가지 방식 모두 지원한다.

---

## 6. Accessibility Rules

- 모든 입력 필드에는 `<label>` 또는 `aria-label`이 있어야 한다.
- 버튼 텍스트는 동작을 명확히 설명해야 한다 (예: "생성", "삽입하기", "저장").
- 색상만으로 상태를 구분하지 않는다 — 텍스트 또는 아이콘을 함께 사용한다.
- 로딩 상태는 `aria-busy="true"` + 시각적 스피너로 함께 전달한다.
- 에러 메시지는 `aria-live="polite"` 영역에 출력하여 스크린 리더에 전달된다.
- 주요 영역(`TemplatePanel`, `ContentInputForm`, `ConditionForm`, `ResultPreview`)은 `<section>` + `<h2>` heading 구조를 가진다.
- 터치 타겟은 최소 44 × 44px (WCAG 2.1 기준).
