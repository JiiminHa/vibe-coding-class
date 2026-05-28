# figma-plugin-insert Specification

## Purpose

CardFlow Figma Plugin이 클립보드 JSON을 읽어 Figma 파일의 TextNode에 텍스트를 삽입하는 동작을 정의한다. Plugin UI(ui.html)와 Figma 샌드박스(code.ts)의 역할 분리 및 postMessage 통신 방식을 포함한다.

## Requirements

### Requirement: Figma Plugin이 클립보드 JSON을 읽어 TextNode에 텍스트를 삽입한다
`cardflow-figma-plugin/` 프로젝트의 Plugin이 실행되면 클립보드에서 CardFlow JSON을 읽고, 각 레이어의 nodeId로 TextNode를 찾아 Plugin API로 텍스트를 삽입해야 한다.

#### Scenario: 정상 삽입
- **WHEN** 유효한 CardFlow JSON이 클립보드에 있고 사용자가 "적용" 버튼을 클릭하면
- **THEN** 각 nodeId에 해당하는 TextNode의 characters가 지정된 text로 업데이트된다

#### Scenario: 클립보드 JSON이 없거나 포맷 불일치
- **WHEN** 클립보드 내용이 CardFlow JSON 포맷(`cardflow: true`)이 아니면
- **THEN** "CardFlow에서 복사한 내용이 없습니다" 오류 메시지를 Plugin UI에 표시한다

#### Scenario: nodeId로 노드를 찾을 수 없음
- **WHEN** JSON의 nodeId가 현재 Figma 파일에 존재하지 않으면
- **THEN** 해당 레이어를 건너뛰고 실패한 레이어 목록을 UI에 표시한다

### Requirement: 텍스트 삽입 전 폰트를 로드한다
Figma Plugin API에서 TextNode의 characters를 수정하기 전에 반드시 `figma.loadFontAsync`를 호출해야 한다. 폰트 로드 없이 수정하면 에러가 발생한다.

#### Scenario: 폰트 로드 성공
- **WHEN** TextNode의 폰트가 로드 가능하면
- **THEN** 폰트 로드 완료 후 characters를 업데이트한다

#### Scenario: 폰트 로드 실패
- **WHEN** TextNode의 폰트를 로드할 수 없으면
- **THEN** 해당 레이어를 건너뛰고 "폰트 로드 실패: [레이어명]" 메시지를 표시한다

### Requirement: Plugin UI와 code.ts가 postMessage로 통신한다
클립보드 읽기는 ui.html(iframe 컨텍스트)에서, Figma API 접근은 code.ts(Figma 샌드박스)에서 수행하며, 두 컨텍스트는 postMessage로 데이터를 교환해야 한다.

#### Scenario: UI에서 code.ts로 데이터 전달
- **WHEN** ui.html에서 클립보드 JSON 파싱이 완료되면
- **THEN** `parent.postMessage({ pluginMessage: { type: 'apply', data: parsedJson } }, '*')`로 code.ts에 전달한다

#### Scenario: code.ts에서 UI로 결과 전달
- **WHEN** 텍스트 삽입이 완료되면
- **THEN** `figma.ui.postMessage({ type: 'done', failed: [...] })`로 결과를 ui.html에 전달하고 UI에 표시한다
