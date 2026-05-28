# Requirements Spec

## 1. Actors

| Actor | Description |
|---|---|
| Primary User | 카드뉴스를 주기적으로 제작하는 지민 본인 (멋사 운영진 + 개인 인스타 운영) |
| Claude API | 입력값을 기반으로 카드뉴스 카피를 자동 생성하는 AI |
| Figma MCP | 생성된 카피를 Figma 템플릿 레이어에 자동 삽입하는 외부 연동 |

## 2. Main Use Cases

### UC-001. 카드뉴스 카피 생성 및 Figma 삽입

- Actor: Primary User, Claude API, Figma MCP
- Goal: 키워드와 조건 입력만으로 카드뉴스 카피를 생성하고 Figma 템플릿에 자동 삽입한다.
- Precondition: Figma 템플릿이 등록되어 있고 레이어 역할 매핑이 완료된 상태
- Main Flow:
  1. 사용자가 모드(멋사 홍보 / 공부 기록)를 선택한다.
  2. 사용자가 주제·키워드·사진을 입력하고 슬라이드 수·톤·타겟 조건을 설정한다.
  3. 사용자가 생성 버튼을 누른다.
  4. Claude API가 입력값을 기반으로 슬라이드별 카피를 생성한다.
  5. Figma MCP가 생성된 카피를 등록된 템플릿 레이어에 자동 삽입한다.
  6. 사용자가 Figma에서 완성된 결과를 확인한다.
- Alternative Flow:
  - 4-a. Claude API 호출 실패 시 → 오류 메시지 표시 후 재시도 버튼 제공
  - 5-a. Figma MCP 삽입 실패 시 → 생성된 카피를 화면에 표시하여 수동 복사 가능하게 함
- Result: Figma 템플릿 레이어에 카피가 자동으로 채워진 상태

### UC-002. Figma 템플릿 등록 및 레이어 매핑

- Actor: Primary User, Figma MCP
- Goal: Figma 파일을 등록하고 텍스트 레이어에 역할(제목·본문·날짜 등)을 매핑한다.
- Precondition: 사용자가 Figma 파일 URL을 보유하고 있음
- Main Flow:
  1. 사용자가 Figma URL을 입력한다.
  2. 시스템이 Figma 파일에서 텍스트 레이어를 자동 파싱한다.
  3. 사용자가 각 레이어에 역할(제목, 소제목, 본문, 날짜, 해시태그 등)을 지정한다.
  4. 매핑 정보가 저장되어 이후 사용 시 자동 로드된다.
- Alternative Flow:
  - 2-a. 유효하지 않은 URL 입력 시 → 오류 메시지 표시
- Result: 레이어 역할 매핑이 저장되어 카피 삽입 시 재사용 가능한 상태

### UC-003. 저장된 템플릿 확인 및 재사용

- Actor: Primary User
- Goal: 이전에 등록한 Figma 템플릿 매핑을 확인하고 선택하여 사용한다.
- Precondition: 등록된 템플릿이 하나 이상 존재
- Main Flow:
  1. 사용자가 앱을 열면 저장된 템플릿 목록이 표시된다.
  2. 사용자가 사용할 템플릿을 선택한다.
  3. 해당 템플릿의 레이어 매핑이 자동으로 로드된다.
- Result: 선택한 템플릿 기준으로 카피 생성 준비 완료

### UC-004. 모드 및 조건 설정

- Actor: Primary User
- Goal: 카드뉴스 성격에 맞는 모드와 세부 조건을 설정한다.
- Precondition: 템플릿이 선택된 상태
- Main Flow:
  1. 사용자가 모드를 선택한다 (멋사 홍보 / 공부 기록).
  2. 사용자가 슬라이드 수, 톤앤매너, 타겟 독자, 추가 요청사항을 입력한다.
  3. 설정값이 카피 생성 프롬프트에 반영된다.
- Result: 설정된 조건이 Claude API 호출 시 프롬프트에 포함됨

## 3. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | 사용자는 Figma URL을 입력해 템플릿을 등록할 수 있다. | Must |
| FR-002 | 시스템은 Figma 파일의 텍스트 레이어를 자동으로 파싱한다. | Must |
| FR-003 | 사용자는 각 레이어에 역할(제목·본문·날짜 등)을 매핑할 수 있다. | Must |
| FR-004 | 레이어 역할 매핑은 저장되어 다음 사용 시 재사용된다. | Must |
| FR-005 | 사용자는 모드(멋사 홍보 / 공부 기록)를 선택할 수 있다. | Must |
| FR-006 | 사용자는 주제·키워드·슬라이드 수·톤·타겟을 입력할 수 있다. | Must |
| FR-007 | Claude API가 입력값을 기반으로 슬라이드별 카피를 자동 생성한다. | Must |
| FR-008 | Figma MCP를 통해 생성된 카피가 템플릿 레이어에 자동 삽입된다. | Must |
| FR-009 | 사용자는 사진을 업로드하여 Figma 이미지 슬롯에 삽입할 수 있다. | Should |
| FR-010 | 등록된 템플릿 목록을 확인하고 선택할 수 있다. | Must |
| FR-011 | 삽입 실패 시 생성된 카피를 화면에서 확인하고 수동 복사할 수 있다. | Should |

## 4. Non-functional Requirements

| ID | Requirement |
|---|---|
| NFR-001 | 키워드 입력부터 Figma 삽입 완료까지 10분 이하로 처리되어야 한다. |
| NFR-002 | 핵심 입력 폼은 모바일 화면에서도 사용할 수 있어야 한다. |
| NFR-003 | 버튼과 입력 필드는 접근 가능한 레이블(aria-label)을 가져야 한다. |
| NFR-004 | Claude API 키 등 민감한 정보는 GitHub 저장소에 커밋하지 않는다. |
| NFR-005 | MVP는 단일 사용자 기준으로 구현하며 로그인·권한 관리는 제외한다. |

## 5. Acceptance Criteria

### AC-001. 템플릿 등록

Given 사용자가 유효한 Figma URL을 입력했을 때  
When 등록 버튼을 누르면  
Then 해당 파일의 텍스트 레이어 목록이 화면에 표시된다.

### AC-002. 레이어 역할 매핑 저장

Given 사용자가 레이어에 역할을 지정했을 때  
When 저장 버튼을 누르면  
Then 다음 사용 시 매핑 정보가 자동으로 로드된다.

### AC-003. 카피 생성

Given 모드·키워드·조건이 입력된 상태에서  
When 생성 버튼을 누르면  
Then 슬라이드 수에 맞게 카피가 생성된다.

### AC-004. Figma 자동 삽입

Given 카피 생성이 완료된 상태에서  
When 삽입 버튼을 누르면  
Then 각 슬라이드 카피가 매핑된 Figma 레이어에 반영된다.

### AC-005. 삽입 실패 폴백

Given Figma MCP 삽입이 실패했을 때  
When 오류가 발생하면  
Then 생성된 카피가 화면에 표시되어 수동으로 복사할 수 있다.

### AC-006. 템플릿 재사용

Given 저장된 템플릿이 하나 이상 있을 때  
When 사용자가 앱을 열면  
Then 저장된 템플릿 목록이 표시되고 선택하여 재사용할 수 있다.

## 6. Requirement Traceability Lite

| Requirement ID | Use Case | Acceptance Criteria | Test Candidate |
|---|---|---|---|
| FR-001 | UC-002 | AC-001 | E2E register template |
| FR-002 | UC-002 | AC-001 | Unit parse Figma layers |
| FR-003 | UC-002 | AC-002 | E2E map layer roles |
| FR-004 | UC-003 | AC-006 | E2E reuse saved template |
| FR-005 | UC-004 | AC-003 | E2E select mode |
| FR-006 | UC-004 | AC-003 | E2E fill input form |
| FR-007 | UC-001 | AC-003 | E2E generate copy |
| FR-008 | UC-001 | AC-004 | E2E insert to Figma |
| FR-009 | UC-001 | AC-004 | E2E upload photo |
| FR-010 | UC-003 | AC-006 | E2E view template list |
| FR-011 | UC-001 | AC-005 | E2E fallback on insert failure |
