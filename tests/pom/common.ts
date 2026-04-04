import { Page } from '@playwright/test';
export class CommonPage {
  protected page: Page;
    // Locators (XPath) defined in constructor
    private usernameInput: string;
    private passwordInput: string;
    private loginButton: string;

    constructor(page: Page) {
        this.page = page;

        // XPath locators
        this.usernameInput = "//input[@id='user-name']";
        this.passwordInput = "//input[@id='password']";
        this.loginButton = "//input[@id='login-button']";
    }

    /**
     * Method to open SauceDemo application URL
     * Navigates to the login page
     */
    async openURL() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * Method to perform login action
     * @param username - valid username
     * @param password - valid password
     * Fills username & password and clicks login button
     */
    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}