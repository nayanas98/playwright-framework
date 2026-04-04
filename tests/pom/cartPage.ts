import { Locator, Page } from '@playwright/test';
import { CommonPage } from './common';

export class CartPage extends CommonPage {
    // Locators (XPath) defined in constructor
    //Dynamic locator functions
    //cartItem is a function that takes a string and returns a Locator
    private cartItem: (name: string) => Locator;
    //removeButton is a function that takes a string and returns a Locator
    private removeButton: (name: string) => Locator;
    //checkoutButton is a Locator object
    private checkoutButton: Locator;
    constructor(page: Page) {
        super(page); 
        this.page = page;
        
         // Dynamic locator for product in cart
        this.cartItem = (name: string) =>
            this.page.locator(`//div[@class='inventory_item_name' and text()="${name}"]`);

        // Remove button for specific product
        this.removeButton = (name: string) =>
            this.page.locator(
                `//div[text()="${name}"]/ancestor::div[@class='cart_item']//button`
            );

        // Checkout button
        this.checkoutButton = this.page.locator('#checkout');
    }

    /**
     * Remove product from cart
     */
    async removeProduct(productName: string) {
        await this.removeButton(productName).click();
    }

    /**
     * Click checkout button
     */
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    // optional helper (clean way instead of exposing page)
    getPage() {
        return this.page;
    }
}