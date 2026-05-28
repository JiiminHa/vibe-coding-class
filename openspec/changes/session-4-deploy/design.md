## Context

3회차에서 CardFlow 핵심 기능이 완성됐다. 현재 상태:
- Next.js App Router 앱, Server Actions (Claude API + Figma REST API), Figma Plugin 구현 완료
- Vercel 미배포, README 없음, E2E 테스트 없음
- 환경변수: `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` (로컬 `.env.local`에만 존재)

## Goals / Non-Goals

**Goals:**
- `npm run build` 에러 없이 통과
- README에 로컬 실행 + 환경변수 + Figma Plugin 사용법 포함
- Playwright 설치 + 핵심 E2E 테스트 1개 작성
- Vercel production 배포, public URL 확인

**Non-Goals:**
- 100% E2E 커버리지 (핵심 흐름 1개만)
- CI/CD 파이프라인 (GitHub Actions)
- 커스텀 도메인
- 로그인·DB·다중 사용자

## Decisions

### 1. Playwright 범위: 1개 흐름만

**결정**: 템플릿 등록 → 카피 생성 UI까지만. Figma API 실제 호출은 mock 처리.

**이유**: Claude API + Figma API 실제 호출 테스트는 시간·비용이 크고 외부 의존성이 있음. UI 흐름만 검증해도 4회차 기준 충분.

**대안**: Cypress — Playwright 대비 Next.js App Router 지원이 약함, 기각.

### 2. Vercel 배포: Vercel CLI

**결정**: `vercel --prod`로 직접 배포. GitHub Actions는 이번 범위 아님.

**이유**: 수업 데모 목적의 one-shot 배포로 충분. CI/CD는 이후 확장.

### 3. README 구조

**결정**: 로컬 실행 → 환경변수 → 4단계 사용 흐름 → Figma Plugin 설치 순서.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| `npm run build`에서 타입 에러 발생 | 배포 전 `npx tsc --noEmit` + `npm run build` 순서로 검증 |
| Vercel 환경변수 누락으로 API 호출 실패 | 배포 후 `/app`에서 직접 동작 확인 |
| Playwright headless에서 Server Action 테스트 어려움 | Claude API mock 처리, UI 상태만 확인 |
