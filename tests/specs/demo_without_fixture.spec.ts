import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pom/dashboardPage';
import { CartPage } from '../pom/cartPage';

test.describe('SauceDemo Tests', () => {

    test('Valid Login Test', async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.openURL();
        await dashboard.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('Invalid Login Test', async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.openURL();
        await dashboard.login('locked_out_user', 'wrong_password');
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match');
    });

    test('Add product to cart and verify', async ({ page }) => {
        const dashboard = new DashboardPage(page);
        const cart = new CartPage(page);
        const productName = 'Sauce Labs Backpack';
        await dashboard.openURL();
        await dashboard.login('standard_user', 'secret_sauce');
        await dashboard.addProductToCart(productName);
        await dashboard.goToCart();
        // ✅ Clean assertion
        await expect(page.getByText(productName)).toBeVisible();
        await cart.clickCheckout();
        await expect(page).toHaveURL(/checkout-step-one/);
    });

});