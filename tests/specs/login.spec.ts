import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import message from '../utils/message';
import userData from '../utils/user-data';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginPage.goto();
});

test.describe('Login', () => {
  test(`successfull login`, async () => {
    await loginPage.doLogin(userData.login.validUsername, userData.login.validPassword);
    await loginPage.checkLoginSuccess();
  });

  test(`failing login - invalid username`, async () => {
    await loginPage.doLogin(userData.login.invalidUsername, userData.login.validPassword);
    await loginPage.checkLoginFail(message.login.invalid);
  });

  test(`failing login - invalid password`, async () => {
    await loginPage.doLogin(userData.login.validUsername, userData.login.invalidPassword);
    await loginPage.checkLoginFail(message.login.invalid);
  });

  test(`failing login - empty username`, async () => {
    await loginPage.doLogin(userData.login.emptyUsername, userData.login.validPassword);
    await loginPage.checkLoginFail(message.login.emptyUsername);
  });

  test(`failing login - empty password`, async () => {
    await loginPage.doLogin(userData.login.validUsername, userData.login.emptyPassword);
    await loginPage.checkLoginFail(message.login.emptyPassword);
  });
});

