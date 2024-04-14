import { type Page, type Locator, expect } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("id=user-name");
    this.password = page.locator("id=password");
    this.loginBtn = page.locator("id=login-button");
    this.errorMessage = page.locator('[class="error-message-container error"]');
  }

  async goto() {
    await this.page.setDefaultNavigationTimeout(0);
    await this.page.goto('/')
  }

  async doLogin(u: string, p: string) {
    await this.username.fill(u);
    await this.password.fill(p);
    await this.loginBtn.click();
  }

  async checkLoginSuccess() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async checkLoginFail(m: string) {
    await expect(this.errorMessage).toHaveText(m);
  }
}

export default LoginPage;
