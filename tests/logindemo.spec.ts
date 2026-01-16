import { expect, test} from '@playwright/test';
import { LoginPage } from '../page_object/login.spec.ts';



test('open sauce demo page',{tag: ['@smoke','@story1']},async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.opensaucedemo();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await loginPage.login_close();
}
);



