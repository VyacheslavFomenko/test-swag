import LoginPage from "../pageobjects/login.page";
import InventoryPage from "../pageobjects/inventory.page";
import {$, browser, expect} from '@wdio/globals';

describe("Test Logout flow", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();

        await loginPage.open();
        await loginPage.login(
            process.env.USERNAME_LOGIN!,
            process.env.PASSWORD_LOGIN!
        );

    });

    it("should login, open menu and logout, then see login page with empty fields", async () => {
        await expect(inventoryPage.isDisplay()).resolves.toBe(true);
        await inventoryPage.openMenu();

        await expect($("#inventory_sidebar_link")).toBeDisplayed();

        await inventoryPage.logout();

        await browser.waitUntil(async () => (await browser.getUrl()).includes('/'), {
            timeout: 5000,
            timeoutMsg: 'URL does not contain "/"'
        });

        await expect(loginPage.getUsernameValue()).resolves.toBe("");
        await expect(loginPage.getPasswordValue()).resolves.toBe("");

    });
});