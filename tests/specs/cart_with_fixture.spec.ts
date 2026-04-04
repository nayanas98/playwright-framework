import { test, expect } from '../fixture/baseTest';

test('Add product to cart and checkout', async ({ dashboard, cart }) => {
    const productName = 'Sauce Labs Backpack';
    // Add product
    await dashboard.addProductToCart(productName);
    // Navigate to cart
    await dashboard.goToCart();
    // Checkout
    await cart.clickCheckout();
    await expect(cart.getPage()).toHaveURL(/checkout-step-one/);
});