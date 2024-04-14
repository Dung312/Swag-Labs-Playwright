import { test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import HomePage from "../pages/home-page";
import userData from "../utils/user-data";

let loginPage: LoginPage;
let homePage: HomePage;

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    loginPage.goto();
    await loginPage.doLogin(userData.login.validUsername, userData.login.validPassword);
    await loginPage.checkLoginSuccess();
    await page.waitForTimeout(2000);
  });

  test(`user add to cart`, async () => {
    await homePage.addToCart();
    await homePage.isAddedToCart();
  });

  test(`user remove cart from homepage`, async () => {
    await homePage.removeFromCart();
    await homePage.isRemovededFromCart();
  });

  test(`user delete product from cart`, async () => {
    await homePage.addToCart();
    await homePage.isAddedToCart();
  });
});
