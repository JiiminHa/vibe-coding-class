## 1. 상태 연결 (app/page.tsx 전체 wiring)

- [x] 1.1 app/page.tsx에 6개 상태 추가: `templates`, `selectedTemplate`, `contentInput`, `generatedCopy`, `isLoading`, `error`
- [x] 1.2 useEffect로 초기 로드 시 localStorage에서 templates 읽기 (storage.ts 활용)
- [x] 1.3 TemplateList에 `templates`, `selectedTemplate`, `onSelect` props 연결
- [x] 1.4 TemplateRegistration에 `onSave` 콜백 연결 (저장 후 templates 상태 갱신)
- [x] 1.5 LayerMappingForm에 `selectedTemplate`, `onMappingSave` props 연결
- [x] 1.6 ModeSelector에 `mode`, `onModeChange` props 연결 (모드 변경 시 subject/keywords 초기화)
- [x] 1.7 ContentInputForm에 `contentInput`, `onContentChange` props 연결
- [x] 1.8 ConditionForm에 `contentInput`, `onContentChange` props 연결
- [x] 1.9 GenerateButton에 `isLoading`, `disabled`(필수 입력값 검증), `onClick` props 연결
- [x] 1.10 ResultPreview에 `generatedCopy`, `selectedTemplate` props 연결
- [x] 1.11 에러 상태 시 `error` 메시지를 화면에 표시

## 2. Figma 레이어 파싱 구현 (actions/figma.ts)

- [x] 2.1 Figma URL에서 fileKey 추출하는 유틸 함수 작성 (`/design/` 및 `/file/` 경로 모두 지원)
- [x] 2.2 `GET /v1/files/:key` 호출 후 응답 타입 정의 (`unknown`으로 받아 타입 좁히기)
- [x] 2.3 Figma 파일 document를 재귀 순회해 `type === "TEXT"` 노드 추출하는 함수 작성
- [x] 2.4 `parseFigmaLayers` Server Action 완성 및 에러 처리 (401, 잘못된 URL 등)
- [x] 2.5 TemplateRegistration에서 "레이어 불러오기" 버튼 클릭 시 `parseFigmaLayers` 호출 연결

## 3. Claude API 카피 생성 구현 (actions/generate.ts)

- [x] 3.1 `generateCopy(input: ContentInput, template: Template)` 시그니처로 수정
- [x] 3.2 template.mappings에서 ignore 제외한 role 목록 추출하는 유틸 작성
- [x] 3.3 ContentInput + role 목록 + slideCount를 포함한 프롬프트 작성
- [x] 3.4 Anthropic SDK로 Claude API 호출, JSON 응답 파싱하여 `GeneratedCopy` 반환
- [x] 3.5 GenerateButton onClick에서 `generateCopy` 호출 연결 및 로딩/에러 상태 처리

## 4. 클립보드 복사 UI (ResultPreview)

- [x] 4.1 `buildClipboardJson(copy: GeneratedCopy, template: Template)` 유틸 함수 작성
- [x] 4.2 ResultPreview에 "클립보드 복사" 버튼 추가
- [x] 4.3 복사 성공 시 2초간 "복사됨 ✓" 피드백 표시
- [x] 4.4 clipboard API 실패 시 fallback — JSON을 텍스트 영역에 표시

## 5. Figma Plugin 프로젝트 세팅 (Should Have)

- [x] 5.1 `cardflow-figma-plugin/` 디렉토리 생성, `manifest.json` 작성
- [x] 5.2 `package.json` 및 `tsconfig.json` 설정, `@figma/plugin-typings` 설치
- [x] 5.3 `ui.html` — 기본 UI (클립보드 읽기 버튼, 결과 표시 영역)
- [x] 5.4 `src/code.ts` — `figma.ui.onmessage` 핸들러 작성, postMessage 통신 구조 설정
- [x] 5.5 `ui.html`에서 클립보드 읽기 → JSON 파싱 → `parent.postMessage` 전송
- [x] 5.6 `code.ts`에서 nodeId로 TextNode 찾기 → `loadFontAsync` → `node.characters` 삽입
- [x] 5.7 삽입 실패 레이어 목록을 UI에 피드백으로 전달
- [x] 5.8 Figma에서 Development Plugin으로 로드 후 E2E 동작 확인
