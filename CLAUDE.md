# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CardFlow** — Figma 카드뉴스 자동화 도구.
사용자가 Figma 템플릿을 등록하고 주제/조건을 입력하면, Claude API가 카드뉴스 카피를 생성하고 Figma REST API로 템플릿에 직접 삽입한다.

## Commands

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npx tsc --noEmit     # 타입 체크
npm run lint         # 린트
```

E2E 테스트 (4회차~):
```bash
npx playwright test
npx playwright test --ui
```

## App Structure

```
src/
  app/
    layout.tsx               # 루트 레이아웃
    page.tsx                 # / → /app 리다이렉트
    app/
      page.tsx               # 메인 도구 (/app) — "use client"
    actions/
      generate.ts            # Server Action: Claude API 카피 생성
      figma.ts               # Server Action: Figma REST API 파싱 + 삽입

  components/
    ui/                      # Button, TextInput, EmptyState, ErrorFallback, LoadingSpinner
    layout/                  # AppHeader

  features/
    template/                # 템플릿 등록·레이어 매핑·localStorage 저장
    content/                 # 모드 선택·키워드 입력·조건 설정
    generate/                # 카피 생성·Figma 삽입·결과 미리보기

  types/
    template.ts              # Template, LayerMapping, LayerRole
    content.ts               # ContentInput, Mode, Tone
    copy.ts                  # GeneratedCopy, SlideCopy
```

## UI Flow (4단계)

1. **템플릿 등록** — Figma URL 입력 → Figma REST API로 텍스트 레이어 파싱 → 역할 매핑 → localStorage 저장
2. **내용 입력** — 모드 선택(멋사 홍보/공부 기록), 주제·키워드 입력, 사진 업로드
3. **조건 설정** — 슬라이드 수(1–10), 톤앤매너, 타겟 독자, 추가 요청
4. **생성 & 삽입** — Server Action → Claude API 카피 생성 → ResultPreview 표시 → Figma REST API 텍스트 삽입

## Architecture

```
Client Component (/app/page.tsx)
  → Server Action (actions/generate.ts)  →  Anthropic SDK  →  Claude API
  → Server Action (actions/figma.ts)     →  Figma REST API  →  Figma 파일
  → localStorage (features/template/storage.ts)  →  Template[] 영속 저장
```

- `ANTHROPIC_API_KEY`, `FIGMA_ACCESS_TOKEN` 은 Server Action 내에서만 사용한다.
- `.env.local`은 `.gitignore`에 포함 필수 — 커밋 금지.
- Figma MCP는 Claude Code 개발 컨텍스트 전용이다. 웹 앱 런타임에서는 Figma REST API를 사용한다.

## Key Conventions

- App Router(`src/app/`) 전용 — Pages Router 혼용 금지
- Server Component 기본, 인터랙션 필요 시에만 `"use client"` 추가
- 외부 API 호출은 반드시 Server Action(`'use server'`)에서만 수행
- `any` 금지 — `unknown`으로 받고 명시적 타입 좁히기
- 공유 타입은 `src/types/`에 정의, feature별 타입은 해당 `features/*/types.ts`에 정의
- 이미지는 `next/image`, 내부 링크는 `next/link` 사용
