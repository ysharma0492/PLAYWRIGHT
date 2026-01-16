import { expect, test} from '@playwright/test';
import { LoginPage } from '../page_object/login.spec.ts';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('open sauce demo page',{tag: ['@smoke','@story1']},async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await expect.soft(page.getByPlaceholder('Username')).toHaveValue('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});


