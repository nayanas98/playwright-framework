import { Locator, Page } from '@playwright/test';
import { CommonPage } from './common';

export class DashboardPage extends CommonPage {
    // Locators (XPath) defined in constructor
    private productsTitle: (name: string) => Locator;
    private cartLink: Locator;
    constructor(page: Page) {
        super(page); 
        this.page = page;

        // XPath locators
    this.productsTitle = (name: string) =>
    this.page.locator(`//div[text()="${name}"]/ancestor::div[@data-test="inventory-item-description"]//button`);
    this.cartLink = this.page.locator('.shopping_cart_link');    
}

   async addProductToCart(productName: string) {
    await this.productsTitle(productName).click();
}

async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/cart/);
}
   
}