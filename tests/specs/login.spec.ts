import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pom/dashboardPage';

test('Invalid Login Test', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.openURL();
    await dashboard.login('locked_out_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});