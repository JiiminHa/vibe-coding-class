# Delivery Plan

## 1. 문서 목적

이 문서는 2회차 후반부터 3회차까지의 개발 실행 계획을 정리한다.  
전체 MVP를 한 번에 구현하지 않고, 공통 베이스와 핵심 기능을 단계적으로 구현하기 위한 기준으로 사용한다.

---

## 2. 전체 개발 목표

최종 목표는 4회차 종료 시 배포 가능한 CardFlow MVP를 완성하는 것이다.

최종 산출물:

- App Page (4단계 흐름: 템플릿 등록 → 내용 입력 → 조건 설정 → 생성·삽입)
- 핵심 기능 (Claude API 카피 생성 + Figma REST API 텍스트 삽입)
- GitHub 저장소
- Playwright E2E 테스트 또는 수동 QA 결과
- 배포 가능한 URL
- README

---

## 3. Session 2 Goal

2회차에서는 전체 프로젝트의 약 20~30%를 완성한다.

### 2회차 완료 기준

- Next.js 프로젝트가 준비되어 있다.
- `/app` route가 존재한다.
- App Page shell이 있다.
- 핵심 타입 (`Template`, `ContentInput`, `GeneratedCopy`)이 정의되어 있다.
- 주요 컴포넌트 placeholder가 있다.
- 템플릿 미등록 시 Empty State가 표시된다.
- `npm run dev`로 실행 가능하다.

---

## 4. Session 2 Must Have

| Task | Description | Done When |
|---|---|---|
| Project scaffold | Next.js 14+ + Tailwind CSS 프로젝트 준비 | `npm run dev` 실행 가능 |
| App route | `/app` 페이지 생성 — 4단계 섹션 자리 | 브라우저에서 `/app` 접속 가능 |
| Type definition | `Template`, `ContentInput`, `GeneratedCopy` 타입 정의 | `src/types/*.ts` 작성 완료, 타입 오류 없음 |
| Component placeholders | `TemplateList`, `ContentInputForm`, `ConditionForm`, `ResultPreview` 파일 생성 | 컴포넌트 파일 존재, 빈 UI 표시 |
| Empty state | 템플릿 미등록 상태 화면 | "등록된 템플릿이 없어요" 안내 표시 |

---

## 5. Session 2 Should Have

| Task | Description | Done When |
|---|---|---|
| Mock template data | 예시 Template 객체 작성 | App Page에서 샘플 템플릿 카드 확인 가능 |
| Basic layout | AppHeader + 메인 레이아웃 구성 | 크림 캔버스(#fffaf0) 배경, 화면이 큰 틀에서 정돈됨 |
| Basic styling | Clay 디자인 토큰 기반 최소 스타일 적용 | 브랜드 색상·폰트·반경이 적용된 상태 |
| LayerMappingForm placeholder | 레이어 매핑 UI 자리 생성 | 아직 파싱 로직은 없어도 입력창 UI 표시 |

---

## 6. Session 2 Not Today

2회차에서는 아래 기능을 구현하지 않는다.

- Claude API 실제 호출
- Figma REST API 연동
- localStorage 실제 읽기·쓰기
- Server Action 구현
- 사진 업로드 기능
- 복잡한 상태 관리
- DB 연동
- 로그인
- 결제
- Playwright 테스트 코드 작성
- 배포

---

## 7. Session 3 Goal

3회차에서는 같은 요구사항을 두 방식으로 구현하고 비교한다.

### 비교 방식

1. MD 설계 문서 기반 개발 (`md-driven-dev` 브랜치)
2. OpenSpec change 기반 개발 (`openspec-driven-dev` 브랜치)

### 3회차 목표

- CardFlow 핵심 기능 구현 (템플릿 등록 → 카피 생성 → Figma 삽입)
- 요구사항 반영도 비교
- 범위 통제 비교
- 코드 구조 비교
- Claude Code 응답 품질 비교

---

## 8. Session 3 Must Have

| Task | Related Requirement | Done When |
|---|---|---|
| Figma URL 입력 및 레이어 파싱 | FR-001, FR-002 | Figma URL 입력 시 텍스트 레이어 목록이 표시됨 |
| 레이어 역할 매핑 저장 | FR-003, FR-004 | 매핑 저장 후 재방문 시 자동 로드됨 |
| 모드 선택 + 내용·조건 입력 폼 | FR-005, FR-006 | 모드 탭 전환, 필드 입력이 동작함 |
| Claude API 카피 생성 (Server Action) | FR-007 | 생성 버튼 클릭 시 슬라이드별 카피가 화면에 표시됨 |
| Figma REST API 텍스트 삽입 (Server Action) | FR-008 | 삽입 버튼 클릭 시 Figma 파일 레이어에 카피가 반영됨 |

---

## 9. Session 3 Should Have

| Task | Description |
|---|---|
| 사진 업로드 (FR-009) | 드래그·파일 선택으로 이미지를 업로드하고 Figma 이미지 슬롯에 삽입 |
| 템플릿 목록 선택 (FR-010) | 저장된 템플릿을 목록에서 선택해 바로 사용 가능 |
| 삽입 실패 폴백 (FR-011) | Figma 삽입 실패 시 생성된 카피를 복사 가능한 텍스트로 표시 |
| 로딩 상태 개선 | 생성 중 스피너 + 진행 상태 텍스트 표시 |

---

## 10. Session 4 Goal

4회차에서는 테스트, 리팩토링, 배포를 진행한다.

### 4회차 목표

- Playwright E2E 테스트 작성 (핵심 흐름 검증)
- 리팩토링 (중복 제거, 타입 정리)
- README 정리
- Vercel 배포
- 최종 발표

---

## 11. Manual QA for Session 2

2회차 종료 전 확인할 항목:

- [ ] `npm run dev`로 앱이 실행된다.
- [ ] `/app` 페이지가 열린다.
- [ ] 큰 TypeScript 오류가 없다 (`npx tsc --noEmit` 통과).
- [ ] App Page shell이 보인다 (4개 섹션 자리가 구분됨).
- [ ] 템플릿 미등록 시 Empty State 메시지가 표시된다.
- [ ] 주요 placeholder 컴포넌트가 화면에 표시된다.
- [ ] 모바일 너비(375px)에서 큰 레이아웃 깨짐이 없다.
- [ ] 오늘 구현 범위를 넘는 기능(Claude API, Figma 연동 등)이 들어가지 않았다.

---

## 12. Verification Commands

```bash
npm run dev
npm run build
npx tsc --noEmit
git status
```

선택적으로 실행:

```bash
npm run lint
```

---

## 13. Branch Plan

3회차 비교 실험을 위해 브랜치를 나눈다.

```text
main
├── md-driven-dev
└── openspec-driven-dev
```

### MD 기반 개발 브랜치

```bash
git checkout -b md-driven-dev
```

### OpenSpec 기반 개발 브랜치

```bash
git checkout main
git checkout -b openspec-driven-dev
```

---

## 14. Development Prompts

### 공통 베이스 구현 프롬프트

```text
01.ProductBrief.md, 02.RequirementsSpec.md, 03.UXUISpec.md, 04.TechnicalDesign.md를 모두 참고해서
오늘 구현할 공통 베이스 20~30%만 제안해 주세요.

조건:
- MD 기반 개발과 OpenSpec 기반 개발 비교를 방해하지 않는 공통 구조만 만드세요.
- Claude API, Figma REST API 실제 연동은 하지 마세요.
- route, shell, type, placeholder 중심으로 계획하세요.
- 아직 파일은 수정하지 말고 수정할 파일과 구현 순서만 제안하세요.
```

### 구현 승인 프롬프트

```text
좋습니다. 제안한 계획대로 구현해 주세요.

조건:
- 04.TechnicalDesign.md의 Source Structure와 Data Models를 따르세요.
- 03.UXUISpec.md의 Component Plan과 Design Tokens를 따르세요.
- Claude API, Figma API 실제 연동은 오늘은 하지 마세요.
- 오늘은 route, 화면 shell, 타입, placeholder까지만 구현하세요.
- 구현 후 변경 파일과 실행 방법을 요약해 주세요.
```

---

## 15. Comparison Criteria for Session 3

3회차에서 두 방식의 결과를 비교할 때 볼 기준:

| Criteria | Question |
|---|---|
| Requirement Coverage | 02.RequirementsSpec.md의 Must Have가 빠짐없이 구현되었는가? |
| Scope Control | 불필요한 기능(로그인, DB 등)이 추가되지 않았는가? |
| Implementation Order | 4단계 흐름 순서대로 자연스럽게 구현되었는가? |
| File Structure | 04.TechnicalDesign.md Source Structure를 따르는가? |
| Code Quality | `any` 금지, strict TypeScript 유지, 중복 최소화 |
| UI Consistency | 03.UXUISpec.md와 DESIGN.md의 Clay 디자인 토큰을 따랐는가? |
| Verifiability | E2E 테스트 또는 수동 QA로 검증하기 쉬운 구조인가? |
| Claude Response Quality | 계획·요약·검증 설명이 명확했는가? |

---

## 16. Risks

| Risk | Mitigation |
|---|---|
| 기능 범위가 커짐 | Must / Should / Not Today로 명확히 분리 |
| 구현 시간이 부족함 | 2회차는 shell·타입까지, API 연동은 3회차 |
| 문서와 구현이 어긋남 | 구현 전 planning-review 실행 |
| OpenSpec이 과하게 커짐 | tasks를 10~20분 단위로 제한 |
| Claude API 키 노출 | `.env.local` 사용, `.gitignore` 반드시 확인 |
| Figma Personal Access Token 권한 오류 | 토큰 생성 시 파일 편집 권한 포함 여부 확인 |
| Figma REST API 레이어 파싱 실패 | 텍스트 노드 필터링 로직 단위 테스트로 검증 |
| Next.js 설치 이슈 | `create-next-app` 공식 템플릿 사용 |
| 학생별 진도 차이 | Must Have 중심으로 진행, Should Have는 선택 |

---

## 17. Commit Plan

2회차 종료 시 커밋:

```bash
git add .
git commit -m "session-2: add planning docs and baseline scaffold"
git push
```

3회차 MD 기반 개발 커밋:

```bash
git commit -m "session-3a: implement core features from MD design docs"
```

3회차 OpenSpec 기반 개발 커밋:

```bash
git commit -m "session-3b: implement core features from OpenSpec change"
```

---

## 18. Final Checklist

2회차 종료 전 확인:

- [ ] 설계 문서 5개 작성 (`01`~`05` 파일)
- [ ] OpenSpec change 생성
- [ ] Next.js 프로젝트 scaffold 완료
- [ ] `/app` route 브라우저 확인
- [ ] `Template`, `ContentInput`, `GeneratedCopy` 타입 정의
- [ ] 주요 placeholder 컴포넌트 생성
- [ ] Empty State 화면 확인
- [ ] `npm run dev` 실행 확인
- [ ] `npx tsc --noEmit` 오류 없음
- [ ] Git commit / push 완료
