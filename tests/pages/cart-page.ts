import { type Page, type Locator, expect } from "@playwright/test";
import productData from "../utils/product-data";

class CartPage {
  readonly shoppingCart: Locator;
  readonly page: Page;
  readonly title: Locator;
  readonly productName: Locator;
  readonly removeBtn: Locator;
  readonly checkOutBtn: Locator;
  readonly productPrice: Locator;


  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = page.locator("id=shopping_cart_container");
    this.title = page.locator('span[data-test="title"]');
    this.productName = page.locator('div[data-test="inventory-item-name"]');
    this.removeBtn = page.locator(
      'button[data-test="'+ productData.product.idRemove +'"]'
    );      
    this.checkOutBtn = page.locator("id=checkout");
    this.productPrice = page.locator('.inventory_item_price');
  }

  async goToShoppingCart() {
    await this.shoppingCart.click();
  }

  async isTitleVisible() {
    await expect(this.title).toBeVisible();
  }

  async getProductName(n: string) {
    await expect(this.productName).toHaveText(n);
  }

  async getProductPrice(p: string) {
    await expect(this.productPrice).toHaveText(p);
  }

  async removeProduct() {
    await this.removeBtn.click();
  }

  async isRemovedFromCart() {
    await expect(this.productName).toBeHidden();
  }

  async clickCheckOut() {
    await this.checkOutBtn.click();
  }

  
}

export default CartPage;
