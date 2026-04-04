import { test as base } from '@playwright/test';
import { DashboardPage } from '../pom/dashboardPage';
import { CartPage } from '../pom/cartPage';

type MyFixtures = {
  dashboard: DashboardPage;
  cart: CartPage;
};

export const test = base.extend<MyFixtures>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);

    // Auto login setup
    await dashboard.openURL();
    await dashboard.login('standard_user', 'secret_sauce');

    await use(dashboard);
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';