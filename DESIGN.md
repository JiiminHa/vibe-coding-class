# CardFlow Design System

**스타일 방향**: Whirlball-inspired Brutalism
흑백 기반 + 형광 라임 포인트. 날카로운 테두리, 볼드 콘덴스드 타이포, 그리드 구조. 장식 없이 구조 자체가 비주얼.

---

## Colors

| Token | Hex | 용도 |
|---|---|---|
| `--color-bg` | `#FFFFFF` | 페이지 배경 |
| `--color-surface` | `#F2F2F2` | 카드/섹션 배경 |
| `--color-ink` | `#000000` | 기본 텍스트 |
| `--color-muted` | `#555555` | 보조 텍스트, 레이블 |
| `--color-accent` | `#CCFF00` | 강조 액션 (생성 버튼, 포커스 링, 로고 배지) |
| `--color-border` | `#000000` | 모든 외곽선 |

### Principle
- 흑/백/형광 3색 이외 컬러 추가 금지
- 그라디언트, 박스쉐도우 사용 금지
- 에러 상태만 예외: `#FF3333` (red)

---

## Typography

| 역할 | Font | Weight | 처리 |
|---|---|---|---|
| Display / 헤딩 | `Barlow Condensed` | 700–800 | uppercase, tight tracking |
| Body / UI | `Space Grotesk` | 400–600 | normal case |
| Step label / 태그 | `Barlow Condensed` | 700 | uppercase, letter-spacing 0.12em |

### Scale

```
Display:   40–56px / Barlow Condensed 700 / uppercase / tracking -0.01em
H2:        24–32px / Barlow Condensed 700 / uppercase
Label:     11px    / Barlow Condensed 700 / uppercase / tracking 0.12em
Body:      14px    / Space Grotesk 400
Body Sm:   12px    / Space Grotesk 400
```

---

## Shape

**Border radius: 0** — 모든 컴포넌트 날카로운 모서리.
Border width: `1.5px solid #000`.

---

## Components

### Button

| Variant | 배경 | 텍스트 | 테두리 | 용도 |
|---|---|---|---|---|
| `primary` | `#000` | `#fff` | 1.5px black | 기본 저장/확인 |
| `accent` | `#CCFF00` | `#000` | 1.5px black | 생성, 복사 등 핵심 CTA |
| `secondary` | `#fff` | `#000` | 1.5px black | 취소, 보조 액션 |

- 높이 최소 44px, padding 10px 20px
- 텍스트: 11px / 700 / uppercase / tracking 0.12em

### TextInput

- 배경: white, 테두리 1.5px black, radius 0
- 레이블: 11px / Barlow Condensed / uppercase / tracking 0.12em
- 포커스 링: 2px `#CCFF00`

### AppHeader

- 배경: `#000` (검정 바)
- 로고 배지: `#CCFF00` 7×7 사각형 안에 "CF" (검정)
- 로고 텍스트: 흰색 / Barlow Condensed / uppercase / tracking widest
- 네비: 11px / bold / uppercase / 구분선 `border-l border-[#333]`

### Section Card (4단계 각 섹션)

```
border: 1.5px solid #000
background: #fff (active) / #F2F2F2 (inactive)
padding: 24px
step label: "STEP 01" — Barlow Condensed 11px uppercase
```

---

## Layout

- 최대 너비: `max-w-7xl` (1280px) centered
- 섹션 간격: `border-t border-[1.5px] border-black`로 구분 (공백 아닌 선)
- 모바일: 단일 컬럼, 동일 border 시스템 유지

---

## Do / Don't

### Do
- 형광 라임은 핵심 CTA 1개에만 집중 사용
- 테두리로 영역 구분 (배경색 대신)
- 레이블은 항상 uppercase + tracking

### Don't
- border-radius 추가 금지
- 그림자(box-shadow) 추가 금지
- 3색(흑/백/라임) 이외 컬러 추가 금지
- 인라인 스타일로 색상 하드코딩 금지 (CSS 변수 사용)
