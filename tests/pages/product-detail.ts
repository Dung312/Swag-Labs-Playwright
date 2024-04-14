import { type Page, type Locator, expect } from "@playwright/test";
import productData from "../utils/product-data";

class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly removeBtn: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('div[data-test="inventory-item-name"]');
    this.removeBtn = page.locator("button[id = 'remove']");
    this.addToCartBtn = page.locator("button[id = 'add-to-cart']");
    this.productPrice = page.locator(".inventory_details_price");
  }

  async goToProductDetails() {
    await this.page.getByText(productData.product.name).click();
  }

  async getProductInfornation(n: string, p: string) {
    await expect(this.productName).toHaveText(n);
    await expect(this.productPrice).toHaveText(p);
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

export default ProductDetailPage;
