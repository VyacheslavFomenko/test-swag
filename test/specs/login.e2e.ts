import {expect} from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import InventoryPage from "../pageobjects/inventory.page";


describe("Test Login flow", () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    it("should login with valid credentials", async () => {
        await loginPage.open();

        await loginPage.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!); //JSON.stringify(process.env.USERNAME), JSON.stringify(process.env.PASSWORD)
        await browser.pause();
        expect(await inventoryPage.isDisplay());
    });
});

