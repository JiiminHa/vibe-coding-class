/**
 * mcp.spec.ts
 * 접근성 트리(accessibility tree) 스냅샷 기반 locator 테스트
 * 앱의 모든 UI 영역을 역할(role) · 텍스트 · placeholder 기준으로 검증한다.
 */

import { test, expect, type Page } from '@playwright/test';

// ─── 공통 mock ───────────────────────────────────────────────────────────────
const MOCK_TEMPLATE = {
  id: 'mock-1',
  name: '테스트 템플릿',
  figmaFileKey: 'TESTKEY',
  figmaUrl: 'https://www.figma.com/design/TESTKEY/test',
  mappings: [
    { nodeId: '1:1', layerName: '제목', role: 'title' },
    { nodeId: '1:2', layerName: '본문', role: 'body' },
  ],
  createdAt: new Date().toISOString(),
};

async function withTemplate(page: Page) {
  await page.addInitScript((t) => {
    localStorage.setItem('cardflow_templates', JSON.stringify([t]));
  }, MOCK_TEMPLATE);
  await page.goto('/app');
  await page.getByText('테스트 템플릿').click();
}

// ─── 헤더 locator ──────────────────────────────────────────────────────────
test.describe('헤더', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('로고 텍스트 "CardFlow"가 헤더에 표시된다', async ({ page }) => {
    // data-testid로 정확히 헤더 로고만 지정 — CSS uppercase로 인한 모호한 매칭 방지
    await expect(page.getByTestId('header-logo')).toBeVisible();
    await expect(page.getByTestId('header-logo')).toHaveText('CardFlow');
  });

  test('"Templates" 버튼이 존재한다', async ({ page }) => {
    await expect(page.getByTestId('nav-templates')).toBeVisible();
  });

  test('"History" 버튼이 존재한다', async ({ page }) => {
    await expect(page.getByTestId('nav-history')).toBeVisible();
  });

  test('Templates 클릭 시 준비 중 토스트가 표시된다', async ({ page }) => {
    await page.getByTestId('nav-templates').click();
    await expect(page.getByTestId('nav-toast')).toBeVisible();
    await expect(page.getByTestId('nav-toast')).toHaveText('템플릿 관리 페이지는 준비 중입니다.');
  });

  test('History 클릭 시 준비 중 토스트가 표시된다', async ({ page }) => {
    await page.getByTestId('nav-history').click();
    await expect(page.getByTestId('nav-toast')).toBeVisible();
    await expect(page.getByTestId('nav-toast')).toHaveText('히스토리 기능은 준비 중입니다.');
  });
});

// ─── Step 1 — Figma 템플릿 설정 locator ──────────────────────────────────
test.describe('Step 1: Figma 템플릿 설정', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('섹션 헤딩 "Figma 템플릿 설정"이 표시된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Figma 템플릿 설정' })).toBeVisible();
  });

  test('Figma URL 입력 필드가 존재한다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('https://www.figma.com/design/...')
    ).toBeVisible();
  });

  test('Figma URL 입력 필드에 타이핑이 반영된다', async ({ page }) => {
    const input = page.getByPlaceholder('https://www.figma.com/design/...');
    await input.fill('https://www.figma.com/design/ABC123/test');
    await expect(input).toHaveValue('https://www.figma.com/design/ABC123/test');
  });

  test('"레이어 불러오기" 버튼이 빈 URL 상태에서 비활성화된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '레이어 불러오기' })).toBeDisabled();
  });

  test('URL 입력 후 "레이어 불러오기" 버튼이 활성화된다', async ({ page }) => {
    await page.getByPlaceholder('https://www.figma.com/design/...').fill('https://www.figma.com/design/ABC/test');
    await expect(page.getByRole('button', { name: '레이어 불러오기' })).toBeEnabled();
  });

  test('파싱 시도 실패 시 한국어 에러가 표시된다 (영문 서버 에러 미노출)', async ({ page }) => {
    await page.getByPlaceholder('https://www.figma.com/design/...').fill('https://invalid.com/wrong');
    await page.getByRole('button', { name: '레이어 불러오기' }).click();

    // 에러 요소가 나타나야 함
    const errorEl = page.getByTestId('figma-url-error');
    await expect(errorEl).toBeVisible({ timeout: 10000 });

    // 핵심: Next.js 내부 영문 에러("An error occurred in the Server Components")가 절대 노출되면 안 됨
    await expect(errorEl).not.toContainText('An error occurred');
    await expect(errorEl).not.toContainText('omitted in production');
  });
});

// ─── Step 2 — 내용 입력 locator ───────────────────────────────────────────
test.describe('Step 2: 내용 입력', () => {
  test.beforeEach(async ({ page }) => {
    await withTemplate(page);
  });

  test('"멋사 홍보" 버튼이 기본 활성 상태다', async ({ page }) => {
    const btn = page.getByRole('button', { name: '멋사 홍보' });
    await expect(btn).toBeVisible();
    // 활성 상태: bg-primary 클래스 확인
    await expect(btn).toHaveClass(/bg-primary/);
  });

  test('"공부 기록" 버튼이 존재한다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '공부 기록' })).toBeVisible();
  });

  test('"공부 기록" 탭 클릭 시 모드 설명 텍스트가 변경된다', async ({ page }) => {
    await page.getByRole('button', { name: '공부 기록' }).click();
    await expect(
      page.getByText('공부한 내용을 요약·정리해서 지식을 공유하는 카드뉴스를 만들어요.')
    ).toBeVisible();
  });

  test('"카드뉴스 주제" 입력 필드가 존재한다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('어떤 카피를 만들까요? (예: 파이썬 기초 특강 안내)')
    ).toBeVisible();
  });

  test('"핵심 키워드" 입력 필드가 존재한다', async ({ page }) => {
    await expect(
      page.getByPlaceholder('쉼표(,)로 구분해서 입력해주세요 (예: 무료, 선착순, 비전공자 환영)')
    ).toBeVisible();
  });

  test('주제와 키워드를 입력하면 값이 반영된다', async ({ page }) => {
    const subject = page.getByPlaceholder('어떤 카피를 만들까요? (예: 파이썬 기초 특강 안내)');
    const keyword = page.getByPlaceholder('쉼표(,)로 구분해서 입력해주세요 (예: 무료, 선착순, 비전공자 환영)');

    await subject.fill('파이썬 기초 특강');
    await keyword.fill('무료, 비전공자 환영');

    await expect(subject).toHaveValue('파이썬 기초 특강');
    await expect(keyword).toHaveValue('무료, 비전공자 환영');
  });

  test('"클릭해서 이미지 업로드" 버튼이 존재한다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '클릭해서 이미지 업로드' })).toBeVisible();
  });
});

// ─── Step 3 — 상세 조건 설정 locator ─────────────────────────────────────
test.describe('Step 3: 상세 조건 설정', () => {
  test.beforeEach(async ({ page }) => {
    await withTemplate(page);
  });

  test('슬라이드 수 spinbutton이 기본값 5로 설정되어 있다', async ({ page }) => {
    await expect(page.getByRole('spinbutton')).toHaveValue('5');
  });

  test('슬라이드 수를 3으로 변경할 수 있다', async ({ page }) => {
    const spin = page.getByRole('spinbutton');
    await spin.fill('3');
    await expect(spin).toHaveValue('3');
  });

  test('톤앤매너 select가 "친근하게"를 기본값으로 가진다', async ({ page }) => {
    await expect(page.getByRole('combobox')).toHaveValue('friendly');
  });

  test('톤앤매너 옵션이 3개 존재한다 (친근/전문/감성)', async ({ page }) => {
    const options = page.getByRole('combobox').locator('option');
    await expect(options).toHaveCount(3);
  });

  test('"타겟 독자" 입력 필드가 존재한다', async ({ page }) => {
    await expect(page.getByPlaceholder('예: 취업 준비생, 재학생')).toBeVisible();
  });

  test('"추가 요청" 입력 필드가 존재한다', async ({ page }) => {
    await expect(page.getByPlaceholder('특별히 반영할 내용이 있다면?')).toBeVisible();
  });
});

// ─── Step 4 — 카피 생성 locator ───────────────────────────────────────────
test.describe('Step 4: 카피 생성 및 삽입', () => {
  test('템플릿 미선택 시 "카피 생성하기" 버튼이 비활성화된다', async ({ page }) => {
    await page.goto('/app');
    await expect(page.getByTestId('generate-button')).toBeDisabled();
  });

  test('템플릿 미선택 시 비활성화 안내 문구가 표시된다', async ({ page }) => {
    await page.goto('/app');
    // data-testid로 안내 문구 요소를 정확히 지정
    await expect(page.getByTestId('generate-disabled-reason')).toBeVisible();
    await expect(page.getByTestId('generate-disabled-reason')).toContainText('1단계에서 Figma 템플릿을 먼저 선택하세요.');
  });

  test('주제·키워드 미입력 시 "카피 생성하기"가 비활성화 유지된다', async ({ page }) => {
    await withTemplate(page);
    await expect(page.getByTestId('generate-button')).toBeDisabled();
  });

  test('주제·키워드 입력 완료 시 "카피 생성하기"가 활성화된다', async ({ page }) => {
    await withTemplate(page);
    await page.getByPlaceholder('어떤 카피를 만들까요? (예: 파이썬 기초 특강 안내)').fill('파이썬 특강');
    await page.getByPlaceholder('쉼표(,)로 구분해서 입력해주세요 (예: 무료, 선착순, 비전공자 환영)').fill('무료, 초보 환영');
    await expect(page.getByTestId('generate-button')).toBeEnabled();
  });
});

// ─── Footer locator ───────────────────────────────────────────────────────
test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('Footer에 현재 연도(2026)가 표시된다', async ({ page }) => {
    const year = new Date().getFullYear().toString();
    await expect(page.getByText(`© ${year}`)).toBeVisible();
  });

  test('Footer에 "CardFlow. All rights reserved."가 표시된다', async ({ page }) => {
    await expect(page.getByText('CardFlow. All rights reserved.')).toBeVisible();
  });
});
