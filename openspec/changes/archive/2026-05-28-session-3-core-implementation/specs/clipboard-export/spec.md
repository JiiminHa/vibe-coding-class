## ADDED Requirements

### Requirement: ResultPreview에서 생성된 카피를 클립보드 JSON으로 복사할 수 있다
GeneratedCopy가 표시된 ResultPreview에 "클립보드 복사" 버튼이 있어야 하며, 클릭 시 Figma Plugin이 소비할 수 있는 JSON 포맷으로 클립보드에 복사된다.

클립보드 JSON 포맷:
```json
{
  "cardflow": true,
  "templateId": "string",
  "slides": [
    {
      "slideNumber": 1,
      "layers": [
        { "nodeId": "123:456", "role": "title", "text": "카피 내용" }
      ]
    }
  ]
}
```

#### Scenario: 복사 성공
- **WHEN** 사용자가 "클립보드 복사" 버튼을 클릭하면
- **THEN** GeneratedCopy와 Template.mappings를 조합한 JSON이 클립보드에 복사되고 "복사됨" 피드백이 표시된다

#### Scenario: 복사 후 피드백
- **WHEN** 클립보드 복사가 완료되면
- **THEN** 버튼이 일시적으로 "복사됨 ✓" 상태로 변경되고 2초 후 원래 상태로 돌아온다

#### Scenario: 클립보드 접근 권한 없음
- **WHEN** 브라우저가 클립보드 접근을 거부하면
- **THEN** 텍스트 영역에 JSON을 표시해 사용자가 수동으로 복사할 수 있게 한다

### Requirement: 클립보드 JSON은 nodeId와 카피 텍스트를 레이어 단위로 포함한다
Figma Plugin이 nodeId만으로 레이어를 찾아 텍스트를 삽입할 수 있도록, 각 레이어의 nodeId와 삽입할 text가 쌍으로 포함되어야 한다.

#### Scenario: 슬라이드별 레이어 매핑
- **WHEN** 슬라이드 수가 3이고 각 슬라이드에 title/body 레이어가 있으면
- **THEN** JSON의 slides 배열에 3개의 항목이 생성되고 각각 해당 nodeId와 텍스트가 포함된다

#### Scenario: ignore role 제외
- **WHEN** LayerMapping의 role이 "ignore"이면
- **THEN** 해당 레이어는 클립보드 JSON의 layers 배열에 포함되지 않는다
