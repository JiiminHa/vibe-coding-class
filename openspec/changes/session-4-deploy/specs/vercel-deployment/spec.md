## ADDED Requirements

### Requirement: 빌드가 에러 없이 통과한다
`npm run build`가 TypeScript 에러, ESLint 에러 없이 완료되어야 한다.

#### Scenario: 빌드 성공
- **WHEN** `npm run build`를 실행하면
- **THEN** 에러 없이 `.next/` 디렉토리가 생성된다

### Requirement: Vercel에 production 배포가 완료된다
Vercel CLI로 배포 후 public URL이 생성되고, 해당 URL에서 앱이 정상 동작해야 한다.

#### Scenario: 배포 URL 접근 가능
- **WHEN** 배포된 Vercel URL에 접속하면
- **THEN** CardFlow 앱이 로드되고 4단계 UI가 표시된다

#### Scenario: 환경변수 등록
- **WHEN** Vercel 프로젝트에 `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN`이 등록되면
- **THEN** 배포 환경에서 Server Action이 정상 동작한다
