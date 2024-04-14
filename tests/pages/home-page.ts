import { type Page, type Locator, expect } from "@playwright/test";
import productData from "../utils/product-data";

class HomePage {
  readonly page: Page;
  readonly menu: Locator;
  readonly cart: Locator;
  readonly addToCartBtn: Locator;
  readonly removeBtn: Locator;
  readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = page.locator("id=react-burger-menu-btn");
    this.cart = page.locator("id=shopping_cart_container");
    this.addToCartBtn = page.locator(
      'button[data-test="'+ productData.product.idAdd +'"]'
    );
    this.removeBtn = page.locator(
      'button[data-test="'+ productData.product.idRemove +'"]'
    );    
    this.image = page.locator('id="item_4_img_link"');
  }

  async goToDetail() {
    await this.image.click();
  }

  async addToCart() {
    await this.page.waitForTimeout(2000);
    await this.addToCartBtn.click();
    await expect(this.removeBtn).toBeVisible();
  }

  async isAddedToCart() {
    await expect(this.removeBtn).toBeVisible();
  }

  async removeFromCart() {
    await this.addToCartBtn.click();
    await this.removeBtn.click();
  }

  async isRemovededFromCart() {
    await expect(this.addToCartBtn).toBeVisible();
  }
}

export default HomePage;
