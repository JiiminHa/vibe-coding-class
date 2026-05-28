# CardFlow

**배포 URL**: https://vibe-coding-class-seven.vercel.app

Figma 카드뉴스 자동화 도구. Figma 템플릿을 등록하고 주제/키워드를 입력하면, Claude API가 슬라이드별 카피를 생성하고 Figma Plugin으로 텍스트를 삽입한다.

---

## 주요 기능

- **템플릿 등록** — Figma URL 입력 시 텍스트 레이어 자동 파싱 + 역할 매핑
- **카피 생성** — 모드·주제·키워드·조건 입력 → Claude API가 슬라이드별 카피 생성
- **Figma 삽입** — 클립보드 JSON 복사 → Figma Plugin으로 레이어에 자동 삽입
- **템플릿 재사용** — localStorage에 저장되어 다음에도 바로 사용

---

## 로컬 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

`.env.local` 파일을 먼저 만들어야 한다.

```env
ANTHROPIC_API_KEY=sk-ant-...
FIGMA_ACCESS_TOKEN=figd_...
```

---

## 환경변수

| 변수명 | 설명 | 발급 |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude API 호출 | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `FIGMA_ACCESS_TOKEN` | Figma 레이어 파싱 | Figma → Settings → Personal access tokens |

---

## 사용 흐름 (4단계)

1. **템플릿 등록** — Figma URL 입력 → 레이어 불러오기 → 역할 매핑 → 저장
2. **내용 입력** — 모드 선택(멋사 홍보 / 공부 기록) → 주제·키워드 입력
3. **조건 설정** — 슬라이드 수(1–10), 톤앤매너, 타겟 독자 설정
4. **생성 & 삽입** — 카피 생성하기 → 클립보드 복사 → Figma Plugin에서 적용

---

## Figma Plugin 설치

1. Figma 데스크탑 앱 → **로고 → Plugins → Development → Import plugin from manifest...**
2. `cardflow-figma-plugin/manifest.json` 선택

```bash
# 플러그인 빌드 (최초 1회)
cd cardflow-figma-plugin && npm install && npm run build
```

사용: Figma에서 **Plugins → Development → CardFlow** 실행 → "클립보드에서 적용"

---

## 개발 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npx tsc --noEmit     # 타입 체크
npx playwright test  # E2E 테스트
```

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 + Whirlball 디자인 시스템 |
| AI | Anthropic Claude API |
| Figma | REST API (읽기) + Plugin API (쓰기) |
| Test | Playwright |
| Deploy | Vercel |
