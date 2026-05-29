# SECURITY REVIEW — CardFlow MVP

> 검토 기준일: 2026-05-29  
> 검토 범위: `src/`, `package.json`, `README.md`, `openspec/changes/`

---

## 요약

| 항목 | 상태 |
|------|------|
| 민감 정보 노출 | ✅ 해결됨 (토큰 .env.local에서 제거) |
| XSS 위험 | ✅ 안전 |
| 외부 링크 보안 속성 | ✅ 해당 없음 (외부 링크 없음) |
| 배포 전 확인 설정 | ✅ 해결됨 (FIGMA_TOKEN Vercel 등록 + 재배포) |
| localStorage 저장 정보 | ✅ 민감 정보 없음 |

---

## 1. 민감 정보 노출

### 🔴 HIGH — `.env.local`에 실제 FIGMA_ACCESS_TOKEN 존재

**파일**: `.env.local`

```
FIGMA_ACCESS_TOKEN=figd_****************************  ← 실제 토큰 (마스킹)
```

**현황**:
- `.gitignore`에 `.env*`가 등록되어 있어 **현재는 Git에 커밋되어 있지 않음** ✅
- `git log -- .env.local` 결과 이력 없음 → 과거에도 커밋된 적 없음 ✅
- 단, 로컬 파일에 실제 토큰이 평문으로 존재

**위험**: 실수로 `git add .env.local` 또는 `.gitignore` 제거 시 GitHub에 토큰 노출

**4회차 내 수정 방법**:
```bash
# .gitignore에 명시적으로 .env.local 추가 (현재는 .env* 패턴으로 포함되어 있지만 명시 권장)
echo ".env.local" >> .gitignore
```
또는 Figma 토큰을 Vercel 환경변수로만 관리하고 로컬 `.env.local`에서 삭제.

---

### ✅ SAFE — API 키는 Server Action에서만 사용

**파일**: `src/app/actions/generate.ts`, `src/app/actions/figma.ts`

```ts
// ✅ 'use server' 지시어로 서버에서만 실행
const apiKey = process.env.ANTHROPIC_API_KEY;   // Server Action 내부
const token = process.env.FIGMA_ACCESS_TOKEN;    // Server Action 내부
```

- `process.env`로 접근하며 클라이언트 번들에 포함되지 않음
- `NEXT_PUBLIC_` 접두어 없음 → 브라우저에 절대 노출 안 됨 ✅

---

## 2. XSS 위험

### ✅ SAFE — `dangerouslySetInnerHTML` 미사용

전체 `src/` 디렉토리 검색 결과 `dangerouslySetInnerHTML` 사용 없음.

**사용자 입력 렌더링 방식 확인**:

```tsx
// ResultPreview.tsx — Claude API 응답을 그대로 텍스트로 렌더링
<h4 className="font-bold text-lg mb-2">{slide.title}</h4>
<p className="text-sm">{slide.body}</p>
<span>#{tag}</span>
```

React의 JSX는 기본적으로 문자열을 이스케이프하므로 XSS 위험 없음 ✅

**추가 확인**: `innerHTML`, `eval` 사용 없음 ✅

---

## 3. localStorage 저장 정보

### ✅ SAFE — 민감 정보 저장 없음

**저장 항목 1** (`cardflow_templates` — localStorage):

```ts
// storage.ts
const STORAGE_KEY = 'cardflow_templates';
// 저장 내용: Template[] — figmaUrl, figmaFileKey, layerMappings
```

- Figma 파일 키(공개 URL에서 추출 가능한 값)와 레이어 구조만 저장
- API 키·토큰 **절대 저장 안 됨** ✅
- `figmaFileKey`는 Figma URL에서 누구나 볼 수 있는 값 → 민감하지 않음

**저장 항목 2** (`cardflow_content` — sessionStorage):

```ts
// page.tsx
sessionStorage.setItem('cardflow_content', JSON.stringify(next));
// 저장 내용: ContentInput — subject, keywords, tone 등 사용자 입력
```

- 개인 식별 정보(PII) 없음, 카드뉴스 주제/키워드만 저장
- sessionStorage는 탭 닫으면 자동 삭제 ✅
- 단, photoDataUrl(base64 이미지)도 sessionStorage에 저장됨 → 이미지가 클 경우 용량 이슈 가능 (보안 문제는 아님)

---

## 4. 외부 링크 보안 속성

### ✅ SAFE — 외부 링크 없음

`src/` 전체에 `target="_blank"` 또는 외부 `href=` 링크 없음.

> `next/link` 사용 시 자동으로 `rel="noopener noreferrer"` 적용됨. 향후 외부 링크 추가 시 반드시 적용 필요.

---

## 5. 배포 전 확인 설정

### ⚠️ MEDIUM — Vercel 환경변수 등록 필요

**tasks.md 4.2, 4.3 미완료 상태**:

```
- [ ] 4.2 ANTHROPIC_API_KEY Vercel 환경변수 등록 (직접 입력 필요)
- [ ] 4.3 FIGMA_ACCESS_TOKEN Vercel 환경변수 등록 (직접 입력 필요)
```

현재 배포 URL(`https://vibe-coding-class-seven.vercel.app`)에서 API 호출 시 환경변수가 없으면:

```
ANTHROPIC_API_KEY가 설정되지 않았습니다. 로컬에서 실행하세요.
// → 에러 메시지가 사용자에게 노출됨
```

**4회차 내 수정 방법**:
```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add FIGMA_ACCESS_TOKEN production
vercel --prod  # 재배포
```

---

### ✅ SAFE — 에러 메시지에서 내부 스택 노출 없음

`parseFigmaLayers` 수정 이후 Server Action이 `{ ok, error }` 형태로 반환:

```ts
// 수정 후 — 한국어 사용자 친화적 메시지만 노출
return { ok: false, error: '올바른 Figma URL을 입력해주세요. (figma.com/design/... 형식)' };
```

production 빌드에서 Next.js 내부 에러 메시지가 그대로 노출되던 문제 해결됨 ✅

---

## 6. 기타 확인 사항

### ✅ SAFE — 이미지 업로드 처리

```ts
// generate.ts — 이미지를 Claude API로 전송 시
media_type: input.photoDataUrl.split(';')[0].split(':')[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
```

- 업로드 이미지가 서버에 저장되지 않음 (메모리 내 처리 후 바로 Claude API로 전송)
- MIME 타입 유효성 검사는 없으나 Claude API에서 자체 거부 가능
- MVP 수준에서는 허용 가능한 위험 수준

### ✅ SAFE — CSRF 위험 없음

Next.js Server Action은 `POST` + `Content-Type: text/plain;charset=UTF-8` 헤더를 사용하며, 브라우저의 동일 출처 정책으로 보호됨.

---

## 4회차 안에 수정 가능한 항목 요약

| 우선순위 | 항목 | 예상 소요 시간 |
|---------|------|--------------|
| 🔴 즉시 | Vercel에 `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` 환경변수 등록 | 5분 |
| 🟡 권장 | `.env.local`의 실제 토큰을 Vercel로 이전 후 로컬 파일에서 제거 | 5분 |
| 🟢 선택 | `photoDataUrl` sessionStorage 저장 제외 (이미지 크기 이슈 방지) | 10분 |
