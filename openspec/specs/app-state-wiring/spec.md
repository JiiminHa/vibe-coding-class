# app-state-wiring Specification

## Purpose

`app/page.tsx`가 CardFlow의 4단계 UI 흐름(템플릿 등록 → 내용 입력 → 조건 설정 → 생성 및 삽입) 전체의 상태를 중앙에서 관리하고 각 자식 컴포넌트에 props로 흘리는 방식을 정의한다.

## Requirements

### Requirement: app/page.tsx가 4단계 흐름의 모든 상태를 중앙 관리한다
`app/page.tsx`는 templates, selectedTemplate, contentInput, generatedCopy, isLoading, error를 useState로 관리하고, 각 자식 컴포넌트에 필요한 상태와 핸들러를 props로 전달해야 한다.

#### Scenario: 초기 로드
- **WHEN** 앱이 처음 로드되면
- **THEN** localStorage에서 저장된 템플릿 목록을 읽어 templates 상태에 저장하고 TemplateList에 전달한다

#### Scenario: 템플릿 선택
- **WHEN** 사용자가 TemplateList에서 템플릿을 선택하면
- **THEN** selectedTemplate 상태가 업데이트되고 이후 generateCopy 호출 시 사용된다

#### Scenario: 카피 생성 완료
- **WHEN** generateCopy Server Action이 성공적으로 반환하면
- **THEN** generatedCopy 상태가 업데이트되고 ResultPreview가 결과를 표시한다

#### Scenario: 로딩 상태
- **WHEN** generateCopy 또는 parseFigmaLayers 호출 중이면
- **THEN** isLoading이 true가 되어 GenerateButton이 비활성화되고 LoadingSpinner가 표시된다

### Requirement: 컴포넌트 간 상태 흐름이 단방향이다
상태는 app/page.tsx에서 자식으로만 흐르며, 자식 컴포넌트는 콜백 props를 통해 상태 변경을 요청한다.

#### Scenario: ContentInput 변경
- **WHEN** ContentInputForm에서 입력값이 변경되면
- **THEN** onContentChange 콜백이 호출되어 app/page.tsx의 contentInput 상태가 업데이트된다

#### Scenario: 필수 입력값 검증
- **WHEN** contentInput.subject 또는 contentInput.keywords가 비어있는 상태에서 생성 버튼이 클릭되면
- **THEN** generateCopy를 호출하지 않고 해당 필드에 에러 표시를 한다

#### Scenario: 모드 변경 시 입력 초기화
- **WHEN** ModeSelector에서 모드를 변경하면
- **THEN** contentInput의 subject와 keywords가 초기화된다
