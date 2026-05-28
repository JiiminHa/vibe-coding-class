## Why

CardFlow 핵심 기능(카피 생성 + Figma Plugin)은 3회차에서 완성됐지만, 배포 가능한 상태가 아니다. README가 없고, Vercel 환경변수 세팅이 안 됐으며, Playwright E2E 테스트도 없다. 오늘 4회차에서 이를 마무리하고 public URL을 만든다.

## What Changes

- **README.md** 작성 — 프로젝트 소개, 로컬 실행 방법, 환경변수 설명, Figma Plugin 사용법 포함
- **Playwright E2E 테스트** 세팅 + 핵심 흐름 1개 작성 (템플릿 등록 → 카피 생성 확인)
- **빌드 검증** — `npm run build` 통과 확인, TypeScript 에러 0개
- **Vercel 배포** — 프로젝트 연결, 환경변수 등록, production 배포, public URL 확인

## Capabilities

### New Capabilities

- `readme-docs`: 프로젝트 README — 설치, 실행, 환경변수, Figma Plugin 사용법 문서화
- `e2e-testing`: Playwright 세팅 + 핵심 E2E 테스트 1개 (템플릿 등록 → 카피 생성 흐름)
- `vercel-deployment`: Vercel 프로젝트 연결, 환경변수 설정, production 배포

### Modified Capabilities

<!-- 없음 — 기존 기능 요구사항 변경 없음 -->

## Impact

- `README.md` 신규 작성
- `package.json` devDependencies에 `@playwright/test` 추가
- `playwright.config.ts` 신규 생성
- `tests/` 디렉토리 신규 생성
- Vercel 프로젝트 생성 및 환경변수 (`ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN`) 등록
- `.gitignore`에 `/test-results`, `/playwright-report` 추가
