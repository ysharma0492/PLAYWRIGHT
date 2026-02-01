import { expect, test} from '@playwright/test';
import { LoginPage } from '../page_object/login.spec.ts';
import * as data from '../tests/data.json';



test('open sauce demo page',{tag: ['@smoke','@story1']},async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.opensaucedemo();
  await loginPage.login(data.username, data.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await loginPage.login_close();
}
);
test('open sauce demo page',{tag: ['@smoke','@story1']},async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.opensaucedemo();
  await loginPage.login(data.username, data.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await loginPage.login_close();
}
);









