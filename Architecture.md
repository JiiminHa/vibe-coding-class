# ARCHITECTURE.md

## Service Overview

CardFlow = 웹 UI + Claude + Figma MCP

사용자가 웹에서 템플릿·내용·조건을 입력하면 Claude가 카드뉴스 카피를 생성하고, Figma MCP를 통해 Figma 템플릿에 직접 삽입한다.

## User Flow

```
사용자
  → 템플릿 등록 (Figma URL 입력 + 레이어 역할 매핑)
  → 내용 입력 (모드, 키워드, 주제, 사진)
  → 조건 설정 (슬라이드 수, 톤앤매너, 타겟)
  → 생성 요청
      → Claude 카피 생성
      → Figma MCP로 템플릿에 삽입
```

## Routes

| Route | 설명 |
|-------|------|
| `/` | 랜딩 페이지 |
| `/app` | 메인 도구 (4단계 스텝 UI) |

## Folder Structure

```
app/
├── page.tsx              # 랜딩 (/)
├── app/
│   └── page.tsx          # 메인 도구 (/app)
├── components/           # 공유 UI 컴포넌트
├── types/                # 공유 TypeScript 타입
└── layout.tsx
public/                   # 정적 에셋
docs/                     # 프로젝트 문서
```

## Data Flow

```
Figma URL 입력
  → 레이어 목록 파싱
  → 레이어별 역할 매핑 (제목 / 본문 / 태그 등)

사용자 입력값 + 레이어 매핑
  → Claude API 호출 (카피 생성 요청)
  → 카피 결과 반환

카피 결과 + 레이어 매핑
  → Figma MCP 호출
  → Figma 템플릿 노드에 텍스트 삽입
```

## Tech Decisions

| 기술 | 선택 이유 |
|------|-----------|
| Next.js App Router | SSR + 서버/클라이언트 컴포넌트 분리 |
| Figma MCP | 별도 API 키 없이 Figma 파일 직접 조작 가능 |
| Tailwind CSS | 빠른 UI 프로토타이핑 |
| TypeScript strict | 타입 안정성, 레이어 매핑 구조 명확화 |
