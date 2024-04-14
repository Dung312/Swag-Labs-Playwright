import { test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import HomePage from "../pages/home-page";
import userData from "../utils/user-data";
import ProductDetailPage from "../pages/product-detail";
import productData from "../utils/product-data";

let loginPage: LoginPage;
let homePage: HomePage;
let productDetailPage: ProductDetailPage;

test.describe("Product Details", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productDetailPage = new ProductDetailPage(page);
    loginPage.goto();
    await loginPage.doLogin(
      userData.login.validUsername,
      userData.login.validPassword
    );
    await loginPage.checkLoginSuccess();
    await page.waitForTimeout(2000);
    await productDetailPage.goToProductDetails();
  });

  test(`verify if product detail has right data`, async () => {
    await productDetailPage.getProductInfornation(
      productData.product.name,
      productData.product.price
    );
  });

  test(`verify user add product to cart`, async () => {
    await productDetailPage.addToCart();
    await productDetailPage.isAddedToCart();
  });

  test(`verify user remove product from cart`, async () => {
    await productDetailPage.removeFromCart();
    await productDetailPage.isRemovededFromCart();
  });
});
