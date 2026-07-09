import { test, expect } from '@playwright/test';

test.describe('Burger constructor', () => {
  test.beforeEach(async ({ page }) => {
  // Ингредиенты берем из HAR
  await page.routeFromHAR('./tests/hars/ingredients.har');

  // Подменяем запрос пользователя
  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          email: 'test@test.ru',
          name: 'Тест',
          createdAt: '',
          updatedAt: ''
        }
      })
    });
  });

  // Подменяем создание заказа
  await page.route('**/api/orders', async (route) => {

  if (route.request().method() === 'POST') {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        name: 'Тестовый бургер',
        order: {
          number: 12345
        }
      })
    });

    return;
  }

  await route.fallback();
});

  await page.addInitScript(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
    document.cookie = 'accessToken=test-access-token';
  });

  await page.goto('/');
});

  test('should add bun to constructor', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Добавить' })
      .first()
      .click();

    await expect(page.getByText('(верх)')).toBeVisible();
    await expect(page.getByText('(низ)')).toBeVisible();
  });

  test('should add filling to constructor', async ({ page }) => {
// Добавляем булку
await page
  .getByRole('button', { name: 'Добавить' })
  .first()
  .click();

// Добавляем начинку
await page
  .locator('li')
  .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
  .getByRole('button', { name: 'Добавить' })
  .click();
  
  // Проверяем, что начинка появилась в конструкторе
  await expect(
  page.locator('.constructor-element__text').getByText(
    'Биокотлета из марсианской Магнолии'
  )
).toBeVisible();
});
  
  // Проверяем открытие модального окно ингридиента
test('should open ingredient modal', async ({ page }) => {
  const ingredient = page.locator('a[href^="/ingredients/"]').first();

  await expect(ingredient).toBeVisible();

  await ingredient.click();

  await expect(page.getByText('Калории, ккал')).toBeVisible();
});

// Проверяем закрытие модалки
test('should close ingredient modal by close button', async ({ page }) => {
  const ingredient = page.locator('a[href^="/ingredients/"]').first();

  await ingredient.click();

  await expect(
  page.getByRole('heading', {
    name: 'Краторная булка N-200i'
  })
).toBeVisible();

  await page.locator('#modals button').click();

  await expect(page.getByText('Калории, ккал')).not.toBeVisible();
});

test('should create order', async ({ page }) => {
  // Добавляем булку
  await page.getByRole('button', { name: 'Добавить' }).first().click();

  // Добавляем начинку
  await page.getByRole('button', { name: 'Добавить' }).nth(1).click();

  // Оформляем заказ
  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  // Проверяем номер заказа
  await expect(
  page.locator('#modals .text_type_digits-large')
).toHaveText('12345');

  // Закрываем модалку
  await page.locator('#modals button').click();

  // Проверяем, что конструктор очистился
  await expect(page.getByText('Выберите булки').first()).toBeVisible();
  await expect(page.getByText('Выберите начинку')).toBeVisible();
});
});
