# CardFlow ⚡

> Figma 카드뉴스 자동화 도구 — 주제와 키워드만 입력하면 Claude AI가 슬라이드 카피를 생성하고 Figma 템플릿에 바로 삽입합니다.

**🔗 배포 URL**: [https://vibe-coding-class-seven.vercel.app](https://vibe-coding-class-seven.vercel.app)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 🗂 **템플릿 등록** | Figma URL 입력 → 텍스트 레이어 자동 파싱 → 역할(제목/본문/해시태그) 매핑 |
| ✍️ **AI 카피 생성** | 주제·키워드·슬라이드 수·톤앤매너 설정 → Claude API가 슬라이드별 카피 자동 작성 |
| 📋 **Figma 자동 삽입** | 생성된 카피를 클립보드로 복사 → CardFlow Figma Plugin으로 레이어에 한 번에 삽입 |
| 💾 **템플릿 재사용** | 등록한 템플릿이 localStorage에 저장 → 다음 방문 시 즉시 선택 가능 |

---

## 화면 구성

```
┌─────────────────────────────────────────┐
│  CF  CARDFLOW          TEMPLATES HISTORY│  ← 헤더 (검정 + 형광 라임)
├─────────────────────────────────────────┤
│  1  Figma 템플릿 설정                    │  ← URL 입력 → 레이어 파싱 → 역할 매핑
│  ─────────────────────────────────────  │
│  2  내용 입력          (템플릿 선택 후)  │  ← 모드 탭 + 주제/키워드/사진
│  ─────────────────────────────────────  │
│  3  상세 조건 설정                       │  ← 슬라이드 수 / 톤앤매너 / 타겟
│  ─────────────────────────────────────  │
│  4  카피 생성 및 삽입                    │  ← 생성 → 결과 미리보기 → 클립보드 복사
└─────────────────────────────────────────┘
```

> **단계 잠금**: 템플릿을 등록·선택하기 전까지 2~4단계는 비활성화됩니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| Figma | REST API (레이어 읽기) + Plugin API (카피 삽입) |
| Test | Playwright (E2E, 33개) |
| Deploy | Vercel |

---

## 빠른 시작 (5분)

### 1. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만듭니다.

```env
ANTHROPIC_API_KEY=sk-ant-...      # console.anthropic.com → API Keys
FIGMA_ACCESS_TOKEN=figd_...       # Figma → Settings → Personal access tokens
```

<details>
<summary>발급 방법 상세 보기</summary>

**ANTHROPIC_API_KEY**
1. [console.anthropic.com](https://console.anthropic.com) 접속
2. 좌측 메뉴 → **API Keys** → **Create Key**

**FIGMA_ACCESS_TOKEN**
1. Figma 데스크탑 또는 웹 → 우측 상단 프로필 → **Settings**
2. **Security** 탭 → **Personal access tokens** → **Generate new token**

</details>

### 2. 설치 및 실행

```bash
git clone https://github.com/JiiminHa/vibe-coding-class.git
cd vibe-coding-class
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속 → `/app`으로 자동 이동

### 3. 사용 흐름

```
① Figma URL 입력 → "레이어 불러오기"
   예) https://www.figma.com/design/XXXXXX/my-template

② 파싱된 텍스트 레이어에 역할 지정 (제목 / 본문 / 해시태그 / 날짜 / 무시)
   → 템플릿 이름 입력 후 "저장"

③ 모드 선택: 멋사 홍보 / 공부 기록
   → 카드뉴스 주제 + 핵심 키워드 입력

④ 슬라이드 수(1–10), 톤앤매너, 타겟 독자 설정

⑤ "카피 생성하기" 클릭 → Claude가 슬라이드별 카피 생성
   → "클립보드 복사" → Figma에서 CardFlow Plugin 실행 → "클립보드에서 적용"
```

---

## Figma Plugin 설치

> 생성된 카피를 Figma 레이어에 자동 삽입하려면 플러그인이 필요합니다.

```bash
# 플러그인 빌드 (최초 1회)
cd cardflow-figma-plugin
npm install
npm run build
```

1. Figma 데스크탑 앱 → 좌측 상단 로고 메뉴
2. **Plugins → Development → Import plugin from manifest...**
3. `cardflow-figma-plugin/manifest.json` 선택

사용: 카피 생성 후 **"클립보드 복사"** → Figma에서 **Plugins → Development → CardFlow** 실행 → **"클립보드에서 적용"**

---

## 테스트

```bash
# E2E 테스트 전체 실행 (33개)
npx playwright test

# 특정 파일만
npx playwright test tests/app.spec.ts    # 기본 흐름 3개
npx playwright test tests/mcp.spec.ts    # 전체 UI locator 30개

# UI 모드 (브라우저에서 직접 확인)
npx playwright test --ui
```

> 테스트는 로컬 dev 서버(`localhost:3000`)가 실행 중이거나 `playwright.config.ts`의 `webServer` 설정으로 자동 시작됩니다.

---

## 개발 명령어

```bash
npm run dev          # 개발 서버 시작 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npx tsc --noEmit     # TypeScript 타입 체크
npx playwright test  # E2E 테스트 실행
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── actions/          # Server Actions (Claude API, Figma REST API)
│   └── app/page.tsx      # 메인 페이지 (/app)
├── components/ui/        # Button, TextInput, EmptyState, LoadingSpinner
├── features/
│   ├── content/          # 모드 선택, 입력 폼, useContentInput 훅, 상수
│   ├── generate/         # 카피 생성, 결과 미리보기, 프롬프트 빌더
│   └── template/         # 템플릿 등록, 레이어 매핑, localStorage 관리
└── types/                # Template, ContentInput, GeneratedCopy 타입

docs/
├── SECURITY_REVIEW.md    # 보안 점검 결과
└── REFACTORING_PLAN.md   # 리팩토링 계획 및 근거

tests/
├── app.spec.ts           # 핵심 흐름 E2E 테스트 (3개)
└── mcp.spec.ts           # 전체 UI locator 테스트 (30개)
```

---

## 보안 & 제외 범위

### 보안 주의사항

- `.env.local`은 **절대 커밋하지 마세요** (`.gitignore`에 포함됨)
- `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN`은 Server Action 내부에서만 사용 — 브라우저에 노출되지 않음
- Vercel 배포 시 환경변수를 Vercel Dashboard 또는 CLI로 별도 등록 필요

```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add FIGMA_ACCESS_TOKEN production
```

### MVP 제외 범위

- 로그인 / 사용자 인증
- 다중 사용자 / 팀 기능
- 생성 히스토리 DB 저장
- CI/CD 자동화 (GitHub Actions)
- 커스텀 도메인

자세한 내용은 [`docs/SECURITY_REVIEW.md`](docs/SECURITY_REVIEW.md)를 참고하세요.

---

## 라이선스

개인 학습 프로젝트 — 멋쟁이사자처럼 vibe coding class 4회차 결과물
