## ADDED Requirements

### Requirement: README가 로컬 실행에 필요한 모든 정보를 포함한다
README.md는 프로젝트 소개, 설치·실행 방법, 필수 환경변수, Figma Plugin 사용법을 포함해야 한다.

#### Scenario: 처음 보는 사람이 로컬 실행 가능
- **WHEN** README를 읽고 지시를 따르면
- **THEN** `npm run dev` 실행 후 `http://localhost:3000`에서 앱이 열린다

#### Scenario: 환경변수 안내 포함
- **WHEN** 환경변수 섹션을 확인하면
- **THEN** `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` 발급 방법과 `.env.local` 설정 예시가 있다

#### Scenario: Figma Plugin 사용법 포함
- **WHEN** Figma Plugin 섹션을 확인하면
- **THEN** `cardflow-figma-plugin/manifest.json` import 방법과 사용 순서가 설명된다
