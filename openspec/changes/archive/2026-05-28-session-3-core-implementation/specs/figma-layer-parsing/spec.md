## ADDED Requirements

### Requirement: parseFigmaLayers는 Figma URL에서 텍스트 레이어 목록을 추출한다
Server Action `parseFigmaLayers`는 Figma REST API `GET /v1/files/:key`를 호출해 파일 전체를 재귀적으로 순회하고, type이 TEXT인 노드만 추출해 반환해야 한다.

시그니처:
```ts
export async function parseFigmaLayers(
  figmaUrl: string
): Promise<Pick<LayerMapping, 'nodeId' | 'layerName'>[]>
```

#### Scenario: 유효한 Figma URL 입력
- **WHEN** 유효한 Figma 파일 URL이 입력되면
- **THEN** 파일 내 모든 TEXT 노드의 nodeId와 layerName 배열을 반환한다

#### Scenario: 유효하지 않은 URL
- **WHEN** Figma URL 포맷이 아닌 문자열이 입력되면
- **THEN** Error를 throw하고 "유효하지 않은 Figma URL입니다" 메시지를 반환한다

#### Scenario: API 토큰 미설정
- **WHEN** `FIGMA_ACCESS_TOKEN` 환경 변수가 없으면
- **THEN** Error를 throw한다

#### Scenario: Figma API 401 응답
- **WHEN** Figma API가 401을 반환하면
- **THEN** "Figma 접근 권한이 없습니다. 토큰을 확인해주세요" 메시지로 Error를 throw한다

### Requirement: Figma URL에서 fileKey를 파싱한다
URL 포맷 `https://www.figma.com/design/:fileKey/...`에서 fileKey를 추출해야 한다.

#### Scenario: 표준 Figma URL
- **WHEN** `https://www.figma.com/design/AbCdEf123/...` 형태의 URL이 입력되면
- **THEN** `AbCdEf123`을 fileKey로 추출해 API 호출에 사용한다

#### Scenario: 구형 Figma URL (/file/ 경로)
- **WHEN** `https://www.figma.com/file/AbCdEf123/...` 형태의 URL이 입력되면
- **THEN** 동일하게 fileKey를 추출해 정상 동작한다
