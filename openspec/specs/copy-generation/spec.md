# copy-generation Specification

## Purpose

Anthropic SDK를 통해 Claude API를 호출하여 Template 구조에 맞는 슬라이드별 카피를 생성하는 Server Action을 정의한다.

## Requirements

### Requirement: generateCopy는 Template와 ContentInput을 받아 슬라이드별 카피를 생성한다
Server Action `generateCopy`는 Anthropic SDK를 통해 Claude API를 호출하고, 슬라이드 수에 맞는 카피를 구조화된 JSON으로 반환해야 한다. Template의 레이어 역할 구조를 프롬프트에 포함해 각 레이어에 맞는 텍스트를 생성한다.

시그니처:
```ts
export async function generateCopy(
  input: ContentInput,
  template: Template
): Promise<GeneratedCopy>
```

#### Scenario: 정상 생성
- **WHEN** 유효한 ContentInput과 Template이 전달되면
- **THEN** `slides` 배열에 `slideCount`개의 SlideCopy가 담긴 GeneratedCopy를 반환한다

#### Scenario: API 키 미설정
- **WHEN** `ANTHROPIC_API_KEY` 환경 변수가 없으면
- **THEN** Error를 throw하고 클라이언트에 에러 메시지를 전달한다

#### Scenario: Claude API 호출 실패
- **WHEN** Anthropic SDK가 네트워크 오류 등으로 실패하면
- **THEN** Error를 throw하고 호출 측에서 재시도 버튼을 표시한다

### Requirement: 프롬프트에 Template 레이어 구조를 포함한다
Claude가 올바른 구조의 JSON을 생성하도록, 프롬프트에 template.mappings에서 추출한 role 목록을 포함해야 한다.

#### Scenario: 레이어 역할 반영
- **WHEN** template.mappings에 title, body, hashtag role이 있으면
- **THEN** 생성된 각 SlideCopy에 title, body, hashtags 필드가 모두 채워진다

#### Scenario: ignore role 제외
- **WHEN** mapping.role이 "ignore"이면
- **THEN** 해당 레이어는 프롬프트에서 제외하고 카피 생성 대상으로 포함하지 않는다
