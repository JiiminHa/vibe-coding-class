## 1. 빌드 검증

- [x] 1.1 `npx tsc --noEmit` 실행 — 타입 에러 0개 확인
- [x] 1.2 `npm run build` 실행 — 빌드 성공 확인
- [x] 1.3 빌드 에러 있으면 수정 후 재확인

## 2. README 작성

- [x] 2.1 프로젝트 소개 섹션 작성 (CardFlow 한 줄 설명 + 주요 기능)
- [x] 2.2 로컬 실행 방법 작성 (`npm install`, `.env.local` 설정, `npm run dev`)
- [x] 2.3 환경변수 섹션 작성 (`ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` 발급·설정 방법)
- [x] 2.4 4단계 사용 흐름 작성 (스크린샷 없이 텍스트로)
- [x] 2.5 Figma Plugin 설치·사용 방법 작성 (`manifest.json` import → 클립보드 적용)

## 3. Playwright E2E 세팅

- [ ] 3.1 `npm install -D @playwright/test` 설치
- [ ] 3.2 `playwright.config.ts` 작성 (baseURL: localhost:3000, chromium only)
- [ ] 3.3 `tests/app.spec.ts` 작성 — 3개 시나리오 (앱 로드, URL 입력, 모드 탭 전환)
- [ ] 3.4 `npx playwright install chromium` 실행
- [ ] 3.5 `npx playwright test` 실행 — 테스트 통과 확인
- [ ] 3.6 `.gitignore`에 `/test-results`, `/playwright-report` 추가

## 4. Vercel 배포

- [ ] 4.1 `vercel` CLI로 프로젝트 연결 (`vercel link` 또는 `vercel`)
- [ ] 4.2 `ANTHROPIC_API_KEY` Vercel 환경변수 등록
- [ ] 4.3 `FIGMA_ACCESS_TOKEN` Vercel 환경변수 등록
- [ ] 4.4 `vercel --prod` 배포 실행
- [ ] 4.5 배포된 public URL에서 앱 로드 확인
- [ ] 4.6 배포 URL을 README에 추가

## 5. 최종 커밋

- [ ] 5.1 변경 파일 전체 `git add` 및 커밋
- [ ] 5.2 `git push origin main`
