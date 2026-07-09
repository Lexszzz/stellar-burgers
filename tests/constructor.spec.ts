import { test, expect } from '@playwright/test';

test.describe('Burger constructor', () => {
  test.beforeEach(async ({ page }) => {
    // Ингредиенты берем из HAR
    await page.routeFromHAR('./tests/hars/api.har');
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
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
      document.cookie = 'accessToken=test-access-token';
    });

    await page.goto('/');
  });

  test('should add bun to constructor', async ({ page }) => {
    await page.getByRole('button', { name: 'Добавить' }).first().click();

    const orderButton = page.getByRole('button', {
      name: 'Оформить заказ'
    });

    await expect(orderButton).toBeVisible();

    const constructor = orderButton.locator('xpath=ancestor::section[1]');

    await expect(constructor).toContainText('Краторная булка N-200i (верх)');
    await expect(constructor).toContainText('Краторная булка N-200i (низ)');
  });

  test('should add filling to constructor', async ({ page }) => {
    // Добавляем булку
    await page.getByRole('button', { name: 'Добавить' }).first().click();

    // Добавляем начинку
    await page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    // Проверяем, что начинка появилась в конструкторе
    await expect(
      page
        .locator('.constructor-element__text')
        .getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });

  // Проверяем открытие модального окно ингридиента
  test('should open ingredient modal', async ({ page }) => {
    const ingredient = page.locator('a[href^="/ingredients/"]').first();

    await ingredient.click();

    const modal = page.locator('#modals');

    await expect(modal).toContainText('Краторная булка N-200i');
    await expect(modal).toContainText('Калории, ккал');
  });

  // Проверяем закрытие модалки
  test('should close ingredient modal by close button', async ({ page }) => {
    const ingredient = page.locator('a[href^="/ingredients/"]').first();

    await ingredient.click();

    const modal = page.locator('#modals');

    await expect(modal).toContainText('Краторная булка N-200i');

    await page.locator('#modals button').click();

    await expect(modal).not.toBeVisible();
  });

  test('should create order', async ({ page }) => {
    // Добавляем булку
    await page.getByRole('button', { name: 'Добавить' }).first().click();

    // Добавляем начинку
    await page.getByRole('button', { name: 'Добавить' }).nth(2).click();

    // Оформляем заказ
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    // Проверяем номер заказа
    await expect(page.locator('#modals .text_type_digits-large')).toBeVisible();

    // Закрываем модалку
    await page.locator('#modals button').click();

    // Проверяем, что конструктор очистился
    const constructor = page
      .getByRole('button', { name: 'Оформить заказ' })
      .locator('xpath=ancestor::section[1]');

    await expect(constructor).toContainText('Выберите булки');
    await expect(constructor).toContainText('Выберите начинку');
  });
});
