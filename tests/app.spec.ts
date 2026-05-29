import { test, expect, type Page } from '@playwright/test';

const MOCK_TEMPLATE = {
  id: 'test-template-1',
  name: '테스트 템플릿',
  figmaFileKey: 'TESTKEY',
  figmaUrl: 'https://www.figma.com/design/TESTKEY/test',
  mappings: [
    { nodeId: '1:1', layerName: '제목 레이어', role: 'title' },
    { nodeId: '1:2', layerName: '본문 레이어', role: 'body' },
  ],
  createdAt: new Date().toISOString(),
};

async function injectMockTemplate(page: Page) {
  await page.addInitScript((template) => {
    localStorage.setItem('cardflow_templates', JSON.stringify([template]));
  }, MOCK_TEMPLATE);
}

// T-01: 앱 초기 렌더링
test('앱 로드 시 4개 섹션 헤딩이 모두 표시된다', async ({ page }) => {
  await page.goto('/app');

  await expect(page.getByText('Figma 템플릿 설정')).toBeVisible();
  await expect(page.getByText('내용 입력')).toBeVisible();
  await expect(page.getByText('상세 조건 설정')).toBeVisible();
  await expect(page.getByText('카피 생성 및 삽입')).toBeVisible();
});

// T-03: 모드 탭 전환
// 2단계 섹션은 템플릿 선택 전에는 pointer-events-none이므로 mock 템플릿을 먼저 주입한다
test('"공부 기록" 탭 클릭 시 설명 텍스트가 변경된다', async ({ page }) => {
  await injectMockTemplate(page);
  await page.goto('/app');

  // mock 템플릿이 목록에 로드될 때까지 대기
  await expect(page.getByText('테스트 템플릿')).toBeVisible();
  // 템플릿 선택
  await page.getByText('테스트 템플릿').click();

  // 기본 모드 "멋사 홍보" 설명 확인
  await expect(page.getByText('멋쟁이사자처럼 행사·모집·활동을 홍보하는 카드뉴스를 만들어요.')).toBeVisible();

  // "공부 기록" 탭 클릭
  await page.getByRole('button', { name: '공부 기록' }).click();

  // 설명 텍스트가 바뀐다
  await expect(page.getByText('공부한 내용을 요약·정리해서 지식을 공유하는 카드뉴스를 만들어요.')).toBeVisible();
  await expect(page.getByText('멋쟁이사자처럼 행사·모집·활동을 홍보하는 카드뉴스를 만들어요.')).not.toBeVisible();
});

// T-04: 템플릿 미선택 상태에서 생성 버튼 비활성화
test('템플릿이 선택되지 않은 초기 상태에서 생성 버튼이 비활성화된다', async ({ page }) => {
  await page.goto('/app');

  const generateBtn = page.getByRole('button', { name: '카피 생성하기' });
  await expect(generateBtn).toBeDisabled();
});
