# REFACTORING PLAN — CardFlow MVP

> 작성일: 2026-05-29  
> 조건: 기능 변경 금지 / Playwright 테스트 통과 유지 / 새 라이브러리 추가 금지 / OpenSpec scope 변경 금지

---

## 리팩토링 목표

현재 MVP는 동작하지만 코드 중복, 책임 혼재, 매직값 분산 등의 문제가 있다.  
기능을 그대로 유지하면서 **읽기 쉽고 수정하기 쉬운 코드**로 개선한다.

---

## 수정할 파일 & 이유

### 1. `src/app/app/page.tsx` (201줄)

**문제점**

| # | 문제 | 코드 위치 |
|---|------|-----------|
| A | `sessionStorage` 읽기/쓰기 로직이 page.tsx 안에 인라인으로 흩어져 있음 | `handleContentChange`, `handleModeChange`, `useState` 초기화 |
| B | `isGenerateDisabled` / `generateDisabledReason` 계산 로직이 렌더 함수 안에 직접 노출 | line 72-79 |
| C | 4개 Step 섹션의 className이 중복 패턴(`opacity-40 pointer-events-none select-none`)을 반복 | Step 2, 3, 4 |
| D | `DEFAULT_CONTENT`가 파일 최상단 전역 상수인데 타입이 없으면 변경 시 런타임 오류 가능 | line 19-26 |

**리팩토링 방법**

```
A → useContentInput 커스텀 훅으로 추출
    - sessionStorage 로직 캡슐화
    - handleContentChange / handleModeChange 포함

B → isGenerateDisabled / generateDisabledReason을
    useGenerateState 훅 또는 별도 유틸 함수로 이동

C → 재사용 함수 sectionClassName(isLocked: boolean) 추출
    또는 <StepSection locked={!selectedTemplate}> 컴포넌트 분리

D → DEFAULT_CONTENT를 types/content.ts 또는 features/content/constants.ts로 이동
```

---

### 2. `src/app/actions/generate.ts` (122줄)

**문제점**

| # | 문제 | 코드 위치 |
|---|------|-----------|
| A | `TONE_LABEL`, `MODE_LABEL` 매직 레코드가 action 파일 안에 하드코딩 | line 9-14 |
| B | `buildPrompt` 함수가 110자 이상의 긴 템플릿 리터럴을 직접 보유 — 프롬프트 수정 시 action 파일 전체를 건드려야 함 | line 29-56 |
| C | `buildActiveRoles` 함수가 action 파일 안에 있지만 실제로는 순수 유틸 함수 | line 19-25 |

**리팩토링 방법**

```
A → src/features/content/constants.ts에 TONE_LABEL, MODE_LABEL 이동
B → src/features/generate/prompt.ts로 buildPrompt 분리
    (action은 API 호출에만 집중)
C → src/features/generate/utils.ts에 buildActiveRoles 이동
    (이미 utils.ts 존재 → 거기에 추가)
```

---

### 3. `src/features/template/hooks/useTemplateState.ts`

**문제점**

| # | 문제 | 코드 위치 |
|---|------|-----------|
| A | `handleTemplateSave` 안에서 `loadTemplates()`를 다시 호출 — 이미 상태로 관리 중인 데이터를 스토리지에서 다시 읽는 비일관성 | line 22-27 |
| B | `useEffect` 내에서 저장된 첫 번째 템플릿을 자동 선택 — 동작은 맞지만 의도가 주석 없이 숨겨져 있음 | line 14-17 |

**리팩토링 방법**

```
A → handleTemplateSave 시 loadTemplates() 재호출 제거
    → LayerMappingForm에서 완성된 Template 객체를 받아 직접 상태에 추가

B → 의도를 드러내는 주석 추가
    // 앱 첫 진입 시 저장된 템플릿 로드 + 첫 번째 자동 선택
```

---

### 4. `src/features/content/components/ModeSelector.tsx`

**문제점**

| # | 문제 |
|---|------|
| A | `MODE_META` 객체가 컴포넌트 파일 안에 정의 — 다른 곳에서 모드 메타 정보가 필요해지면 중복 발생 |

**리팩토링 방법**

```
A → src/features/content/constants.ts로 MODE_META 이동
    → ModeSelector는 import해서 사용
```

---

## 리팩토링 후 파일 구조 변경 요약

```
src/
  features/
    content/
      constants.ts          ← NEW: MODE_META, TONE_LABEL, MODE_LABEL
      hooks/
        useContentInput.ts  ← NEW: sessionStorage + contentInput 상태 관리
    generate/
      prompt.ts             ← NEW: buildPrompt, buildActiveRoles
      utils.ts              ← 기존: buildClipboardJson (buildActiveRoles 추가)
```

---

## 변경하지 않을 것

- 모든 컴포넌트의 UI / Props 인터페이스
- Server Action 시그니처 (`generateCopy`, `parseFigmaLayers`)
- `data-testid` 속성 (Playwright 테스트 의존)
- `types/` 디렉토리의 타입 정의
- `storage.ts` 인터페이스

---

## 우선순위

| 순서 | 파일 | 예상 소요 | 테스트 영향 |
|------|------|-----------|------------|
| 1 | `page.tsx` → `useContentInput` 훅 추출 | 15분 | 없음 (내부 리팩토링) |
| 2 | `generate.ts` → `prompt.ts` 분리 | 10분 | 없음 |
| 3 | `constants.ts` 생성 + MODE_META / TONE_LABEL 이동 | 10분 | 없음 |
| 4 | `useTemplateState.ts` handleTemplateSave 수정 | 5분 | 없음 |
