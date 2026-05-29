# CardFlow Design System

> **스타일 방향**: Whirlball-inspired Brutalism  
> 흑백 기반 + 형광 라임 포인트. 날카로운 테두리, 볼드 콘덴스드 타이포, 그리드 구조.  
> 장식 없이 구조 자체가 비주얼. 단계별 섹션에만 브랜드 포인트 컬러 제한 사용.

---

## 1. Color Tokens

### Core Palette

| CSS 변수 | Hex | Tailwind 클래스 | 용도 |
|---------|-----|----------------|------|
| `--color-bg` | `#FFFFFF` | `bg-bg` / `bg-canvas` | 페이지 전체 배경 |
| `--color-surface` | `#F2F2F2` | `bg-surface` | 카드·섹션 배경 |
| `--color-surface-card` | `#F2F2F2` | `bg-surface-card` | 카드 컴포넌트 배경 |
| `--color-surface-strong` | `#E8E8E8` | `bg-surface-strong` | 탭·선택 영역 배경 |
| `--color-ink` | `#000000` | `text-ink` | 기본 본문 텍스트 |
| `--color-muted` | `#555555` | `text-muted` | 보조 텍스트·레이블 |
| `--color-accent` | `#CCFF00` | `bg-accent` / `text-accent` | 강조 CTA·포커스 링·로고 배지 |
| `--color-border` | `#000000` | `border-border` | 모든 외곽선 |
| `--color-primary` | `#000000` | `bg-primary` / `text-primary` | 기본 버튼 배경 |
| `--color-hairline` | `#000000` | `border-hairline` | 1.5px 구분선 |

### Step Brand Colors (단계 섹션 전용)

| CSS 변수 | Hex | Tailwind 클래스 | 사용 위치 |
|---------|-----|----------------|----------|
| `--color-brand-peach` | `#FF6B35` | `bg-brand-peach` | Step 2 아이콘·섹션 테두리 |
| `--color-brand-lavender` | `#7B61FF` | `bg-brand-lavender` | Step 3 아이콘·섹션 테두리 |
| `--color-brand-pink` | `#FF3D71` | `bg-brand-pink` | Step 4 아이콘·생성 버튼 |

### 색상 원칙

- **흑/백/라임** 3색이 기본. 브랜드 컬러는 단계 구분 목적으로만 사용
- 그라디언트, 박스쉐도우 사용 금지
- 에러 상태 전용: `#EF4444` (Tailwind `red-500`)
- 인라인 스타일로 색상 하드코딩 금지 — CSS 변수 또는 Tailwind 토큰만 사용

---

## 2. Typography

### 폰트

| 역할 | Font | Variable | 로드 방식 |
|------|------|----------|----------|
| Body / UI 텍스트 | Space Grotesk | `--font-body` | `next/font/google` |
| Display / 헤딩 / 레이블 | Barlow Condensed | `--font-display` | `next/font/google` |

### 타입 스케일

| 이름 | 크기 | 폰트 | Weight | 변환 | 자간 | 용도 |
|------|------|------|--------|------|------|------|
| Display | 40–56px | Barlow Condensed | 700 | uppercase | -0.01em | 히어로 헤딩 |
| H2 | 24px | Space Grotesk | 700 | — | — | 섹션 타이틀 (`text-2xl font-bold`) |
| H3 | 20px | Space Grotesk | 600 | — | — | 카드 타이틀 (`text-xl font-semibold`) |
| H4 | 18px | Space Grotesk | 700 | — | — | 슬라이드 카피 제목 (`text-lg font-bold`) |
| Body | 14px | Space Grotesk | 400 | — | — | 기본 본문 (base) |
| Body Sm | 12px | Space Grotesk | 400 | — | — | 보조 설명 (`text-xs`) |
| Label | 11px | Space Grotesk | 700 | uppercase | 0.12em | 인풋 레이블, 버튼, 네비 (`text-[11px] tracking-[0.12em]`) |
| Step Label | 11px | Barlow Condensed | 700 | uppercase | 0.12em | Step 섹션 번호 레이블 (`.label-step`) |

---

## 3. Spacing & Layout

### 간격 단위 (Tailwind 기본 4px 배수)

| 단계 | 값 | 사용 예 |
|------|-----|--------|
| xs | 4px (1) | 아이콘·텍스트 사이 |
| sm | 8px (2) | 인풋 내부 상하 |
| md | 16px (4) | 카드 내부 요소 간 |
| lg | 24px (6) | 섹션 내부 패딩 |
| xl | 32px (8) | 컴포넌트 상하 여백 |
| 2xl | 48px (12) | 섹션 간 간격 |
| 3xl | 64px (16) | 페이지 상단 패딩 |

### 페이지 레이아웃

```
max-width: 1280px (max-w-7xl) — 헤더
max-width: 1024px (max-w-5xl) — 본문 콘텐츠
horizontal padding: 24px (px-6)
section gap: 64px (space-y-16)
```

### 컨테이너 패딩

| 컴포넌트 | 패딩 |
|---------|------|
| 섹션 카드 | `p-8` (32px) / `md:p-12` (48px) |
| 컴포넌트 카드 | `p-6` (24px) |
| 버튼 | `px-5 py-2.5` |
| 인풋 | `px-4 py-2.5` |

---

## 4. Shape & Border

| 속성 | 값 | 적용 |
|------|----|------|
| Border radius | **0px** (전체) | 모든 버튼·인풋·카드 |
| Border width | **1.5px** | 모든 외곽선 (`border-[1.5px]`) |
| Border color | `#000000` | 기본 상태 |
| Border focus | `#CCFF00` 2px ring | 포커스 상태 |

> 예외: Step 번호 아이콘, 모드 탭, 슬라이드 카드는 `rounded-xl` (12px) 사용

---

## 5. Components

### Button

```tsx
<Button variant="primary | accent | secondary">텍스트</Button>
```

| Variant | 배경 | 텍스트 | 테두리 | Hover | 용도 |
|---------|------|--------|--------|-------|------|
| `primary` (기본) | `#000000` | `#FFFFFF` | 1.5px black | `#111` | 저장·확인·파싱 |
| `accent` | `#CCFF00` | `#000000` | 1.5px black | opacity 80% | 핵심 CTA (생성·복사) |
| `secondary` | `#FFFFFF` | `#000000` | 1.5px black | `#F2F2F2` | 취소·보조 액션 |

**공통 속성:**
- 최소 높이: 44px (`min-h-[44px]`)
- 텍스트: 11px / bold / uppercase / tracking-widest
- Disabled: opacity 30% (`disabled:opacity-30`)
- `data-testid="generate-button"` — 생성 버튼

---

### TextInput

```tsx
<TextInput label="레이블 텍스트" placeholder="..." value={} onChange={} />
```

**구조:**
```
[Label]       ← 11px / bold / uppercase / tracking 0.12em / text-black
[Input]       ← 1.5px border-black / radius 0 / bg-white / min-h-44px
              포커스: 2px ring #CCFF00
              placeholder: #999
```

**레이블은 항상 uppercase + tracking — `htmlFor`+`id` 없으면 `getByPlaceholder`로 접근**

---

### AppHeader

```
배경: #000000 (검정 바)
높이: 56px (h-14)
sticky top-0 z-50
```

| 요소 | 스타일 |
|------|--------|
| 로고 배지 | 28px 정사각형 / `#CCFF00` 배경 / "CF" 검정 bold |
| 로고 텍스트 | 흰색 / Barlow Condensed / bold / uppercase / tracking-widest |
| 네비 버튼 | 11px / bold / uppercase / `#888` → hover `#CCFF00` / border-l `#333` |
| 토스트 | fixed top-16 / `#222` 배경 / 흰 텍스트 / 1.5px border `#444` |

- `data-testid="header-logo"` — 로고 span
- `data-testid="nav-templates"` — Templates 버튼
- `data-testid="nav-history"` — History 버튼
- `data-testid="nav-toast"` — 토스트 메시지

---

### Step Section (4단계 진행 섹션)

각 단계는 고유 브랜드 컬러를 가지는 섹션 카드:

| Step | 아이콘 색 | 섹션 배경 | 섹션 테두리 |
|------|----------|----------|------------|
| 1 — Figma 템플릿 설정 | `bg-primary` (#000) | 없음 (흰 배경) | 없음 |
| 2 — 내용 입력 | `bg-brand-peach` (#FF6B35) | `bg-brand-peach/5` | `border-brand-peach/20` |
| 3 — 상세 조건 설정 | `bg-brand-lavender` (#7B61FF) | `bg-brand-lavender/5` | `border-brand-lavender/20` |
| 4 — 카피 생성 및 삽입 | `bg-brand-pink` (#FF3D71) | `bg-brand-pink/5` | `border-brand-pink/10` |

**잠금 상태** (템플릿 미선택 시 Step 2~4):
```css
opacity: 40%
pointer-events: none
user-select: none
```

**Step 아이콘:**
```
w-10 h-10 / rounded-xl / 텍스트 흰색 / text-lg font-bold
```

---

### ModeSelector (탭)

```tsx
<ModeSelector mode="likelion | study" onModeChange={fn} />
```

| 상태 | 스타일 |
|------|--------|
| 컨테이너 | `bg-surface-strong` (#E8E8E8) / `rounded-pill` (0) / `p-1.5` |
| 활성 탭 | `bg-primary` (#000) / 흰 텍스트 / `rounded-pill` |
| 비활성 탭 | `text-muted` / hover `text-ink` |
| 설명 텍스트 | 12px / `text-muted` / 탭 하단 |

**모드 옵션:**
- `likelion` → "멋사 홍보" / 멋쟁이사자처럼 행사·모집·활동 홍보
- `study` → "공부 기록" / 공부 내용 요약·정리 공유

---

### TemplateList (카드 목록)

```
컨테이너: bg-surface-card / rounded-xl / p-6 / border-hairline
아이템 기본: bg-white / border-hairline / hover: border-brand-pink
아이템 선택: bg-primary (#000) / text-white / border-primary
```

---

### ResultPreview (슬라이드 카드)

```
그리드: grid-cols-1 / md:grid-cols-2 / lg:grid-cols-3 / gap-6
카드: bg-surface-card / rounded-xl / p-6 / border-hairline
hover 효과: 좌측 1px accent 바 (brand-pink) opacity 전환
Slide 번호 배지: 10px bold / bg-white / border-hairline
해시태그: 10px / bg-white / border-hairline / rounded-full
```

---

### EmptyState

```
layout: flex-col items-center / gap-3 / py-10 / text-center
이모지: 36px (aria-hidden)
타이틀: 16px / font-semibold / #0a0a0a
설명: 14px / #6b6b6b
```

---

### LoadingSpinner

```
spinner: 20px SVG / animate-spin / text-brand-pink
레이블: 14px / #6b6b6b
aria-busy="true"
```

---

## 6. Animation

| 이름 | 키프레임 | 적용 |
|------|---------|------|
| `slide-up` | `translateY(16px) opacity:0` → `translateY(0) opacity:1` | 커스텀 CSS |
| `animate-slide-up` | 0.4s / `cubic-bezier(0.16, 1, 0.3, 1)` | `.animate-slide-up` |
| `fade-in slide-in-from-bottom-4` | Tailwind animate-in | 각 섹션 진입 |
| 섹션 딜레이 | Step1: 0ms / Step2: 100ms / Step3: 200ms / Step4: 300ms | `delay-100~300` |

---

## 7. Accessibility

| 항목 | 구현 |
|------|------|
| 최소 터치 영역 | 44px (`min-h-[44px]`) — 모든 인터랙티브 요소 |
| 포커스 링 | 2px `#CCFF00` ring — 키보드 접근성 |
| 에러 메시지 | `aria-live="polite"` |
| 로딩 상태 | `aria-busy="true"` + `aria-label` |
| 비활성 버튼 | `disabled` 속성 + opacity 30% |
| 이미지 | `alt` 속성 필수 |

---

## 8. data-testid 목록 (Playwright 연동)

| testid | 요소 | 위치 |
|--------|------|------|
| `header-logo` | 헤더 로고 span | AppHeader |
| `nav-templates` | Templates 버튼 | AppHeader |
| `nav-history` | History 버튼 | AppHeader |
| `nav-toast` | 준비 중 토스트 | AppHeader |
| `generate-button` | 카피 생성하기 버튼 | GenerateButton |
| `generate-disabled-reason` | 비활성화 안내 문구 | GenerateButton |
| `figma-url-error` | URL 파싱 에러 메시지 | TemplateRegistration |

---

## 9. Figma 구현 가이드

### 컬러 스타일 등록

```
Primary/Ink       #000000
Primary/Canvas    #FFFFFF
Primary/Accent    #CCFF00
Surface/Default   #F2F2F2
Surface/Card      #F2F2F2
Surface/Strong    #E8E8E8
Text/Muted        #555555
Brand/Peach       #FF6B35
Brand/Lavender    #7B61FF
Brand/Pink        #FF3D71
Status/Error      #EF4444
```

### 텍스트 스타일 등록

```
Display/Hero      Barlow Condensed 700 / 48px / uppercase / -0.01em
Heading/H2        Space Grotesk 700 / 24px
Heading/H3        Space Grotesk 600 / 20px
Label/Default     Space Grotesk 700 / 11px / uppercase / 0.12em
Body/Default      Space Grotesk 400 / 14px
Body/Small        Space Grotesk 400 / 12px
```

### 이펙트 스타일

```
Focus Ring   : 2px offset-0 #CCFF00
Border/Default: 1.5px solid #000000
```

### 컴포넌트 구조 우선순위

1. **Button** (primary / accent / secondary) — 가장 많이 재사용
2. **TextInput** (label + input)
3. **StepSection** (step 번호 아이콘 + 헤딩 + 콘텐츠 슬롯)
4. **ModeSelector** (탭 컨테이너)
5. **AppHeader** (로고 + 네비)
6. **SlideCard** (ResultPreview 내 카드)

---

## 10. Do / Don't

### ✅ Do
- 형광 라임(`#CCFF00`)은 핵심 CTA 1개 또는 포커스에만 집중 사용
- 브랜드 컬러(peach/lavender/pink)는 단계 구분 목적으로만
- 테두리로 영역 구분 (배경색 변경 대신)
- 레이블은 항상 uppercase + letter-spacing
- `data-testid` 속성 유지 (테스트 locator 의존)

### ❌ Don't
- border-radius 추가 (Step 아이콘·탭 예외 제외)
- 그림자(box-shadow) 추가
- 3색 + 4 브랜드 컬러 이외 색상 추가
- `dangerouslySetInnerHTML` 사용
- 인라인 스타일로 색상 하드코딩
- `NEXT_PUBLIC_` 접두어로 API 키 노출
