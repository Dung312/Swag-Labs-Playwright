import { type Page, type Locator, expect } from "@playwright/test";
import productData from "../utils/product-data";

class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("id=first-name");
    this.title = page.locator('span[data-test="title"]');
    this.lastName = page.locator("id=last-name");
    this.postalCode = page.locator("id =postal-code");
    this.continueBtn = page.locator("id=continue");
    this.finishBtn = page.locator("id=finish");
    this.productName = page.locator('div[data-test="inventory-item-name"]');
    this.productPrice = page.locator(".inventory_item_price");
  }

  async isTitleVisible() {
    await expect(this.title).toBeVisible();
  }

  async inputInformation(f: string, l: string, p: string) {
    await this.firstName.fill(f);
    await this.lastName.fill(l);
    await this.postalCode.fill(p);
  }

  async doCheckout() {
    await this.continueBtn.click();
    await expect(this.title).toHaveText("Checkout: Overview");
  }

  async doFinishCheckOut() {
    await this.finishBtn.click();
  }

  async isCheckoutSuccess() {
    await expect(
      this.page.getByText("Thank you for your order!")
    ).toBeVisible();
  }

  async checkShippingInformation() {
    await expect(this.productName).toHaveText(productData.product.name);
    await expect(this.productPrice).toHaveText(productData.product.price);
    await expect(this.page.getByText("Payment Information:")).toBeVisible();
    await expect(this.page.getByText("Shipping Information:")).toBeVisible();
    await expect(this.page.getByText("Price Total")).toBeVisible();
  }
}

export default CheckoutPage;
