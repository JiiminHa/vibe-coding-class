## ADDED Requirements

### Requirement: Playwright가 설치되고 기본 설정이 존재한다
`@playwright/test`가 devDependency로 설치되고, `playwright.config.ts`가 프로젝트 루트에 존재해야 한다.

#### Scenario: 테스트 실행 명령
- **WHEN** `npx playwright test`를 실행하면
- **THEN** 에러 없이 테스트 스위트가 실행된다

### Requirement: 핵심 흐름 E2E 테스트 1개가 존재한다
`tests/` 디렉토리에 템플릿 등록 → 카피 생성 UI 흐름을 검증하는 테스트가 있어야 한다.

#### Scenario: 앱 진입 및 UI 렌더링 확인
- **WHEN** `http://localhost:3000/app`에 접속하면
- **THEN** "Figma 템플릿 설정" 섹션이 화면에 표시된다

#### Scenario: Figma URL 입력 필드 동작
- **WHEN** Figma URL 입력 필드에 텍스트를 입력하면
- **THEN** 입력값이 필드에 반영된다

#### Scenario: 모드 선택 UI 동작
- **WHEN** "공부 기록" 탭을 클릭하면
- **THEN** 해당 탭이 활성화 상태로 바뀐다
