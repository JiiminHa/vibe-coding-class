# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CardFlow** — Figma 카드뉴스 자동화 도구.
사용자가 Figma 템플릿을 등록하고 주제/조건을 입력하면, Claude가 카드뉴스 카피를 생성해 Figma 템플릿에 직접 삽입한다.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **External**: Figma MCP (claude.ai 계정에 연결됨)

## Commands

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npx tsc --noEmit

# 린트
npm run lint
```

## App Structure

```
app/
├── page.tsx              # 랜딩 페이지 (/)
├── app/
│   └── page.tsx          # 메인 도구 페이지 (/app)
├── components/           # 공유 UI 컴포넌트
├── types/                # 공유 TypeScript 타입
└── layout.tsx
public/                   # 정적 에셋
```

## UI Flow (4단계)

1. **템플릿 등록** — Figma URL 입력 → 레이어 자동 파싱 → 역할 매핑
2. **내용 입력** — 모드 선택(멋사/공부기록), 키워드·주제 입력, 사진 업로드
3. **조건 설정** — 슬라이드 수, 톤앤매너, 타겟, 추가 요청
4. **생성 & 삽입** — Claude가 카피 생성 → Figma MCP로 템플릿에 직접 삽입

## Figma MCP 연동

- Figma MCP는 claude.ai 계정에 이미 연결된 상태
- 별도 API 키 불필요
- Figma 파일 키와 노드 ID는 Figma URL에서 파싱

## Key Conventions

- App Router(`app/`) 전용 — Pages Router 혼용 금지
- Server Component 기본, 인터랙션 필요 시에만 `"use client"` 추가
- 이미지는 `next/image` 사용
- 내부 링크는 `next/link` 사용
- `any` 금지 — `unknown`으로 받고 명시적 타입 좁히기
- 공유 타입은 `app/types/`에 정의
