import { test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import HomePage from "../pages/home-page";
import userData from "../utils/user-data";
import CartPage from "../pages/cart-page";
import CheckoutPage from "../pages/checkout-page";
import productData from "../utils/product-data";

let loginPage: LoginPage;
let homePage: HomePage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe("Cart details", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    loginPage.goto();
    await loginPage.doLogin(
      userData.login.validUsername,
      userData.login.validPassword
    );
    await loginPage.checkLoginSuccess();
    await page.waitForTimeout(2000);
    await homePage.addToCart();
    await homePage.isAddedToCart();
    await cartPage.goToShoppingCart();
  });

  test(`user add to cart & verify if it's visible in cart page`, async () => {
    await cartPage.isTitleVisible();
    await cartPage.getProductName(productData.product.name);
    await cartPage.getProductPrice(productData.product.price);
  });

  test(`user remove product from cart`, async () => {
    await cartPage.isTitleVisible();
    await cartPage.removeProduct();
    await cartPage.isRemovedFromCart();
  });

  test(`user checkout`, async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await cartPage.isTitleVisible();
    await cartPage.clickCheckOut();
    await checkoutPage.isTitleVisible();
    await checkoutPage.inputInformation(
      userData.userInformation.firstName,
      userData.userInformation.lastName,
      userData.userInformation.zip
    );
    await checkoutPage.doCheckout();
    await checkoutPage.checkShippingInformation();
    await checkoutPage.doFinishCheckOut();
    await checkoutPage.isCheckoutSuccess();
  });
});
