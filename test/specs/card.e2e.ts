import {browser, expect} from '@wdio/globals';
import LoginPage from "../pageobjects/login.page";
import InventoryPage from "../pageobjects/inventory.page";
import CardPage from "../pageobjects/card.page";

describe("Test Card persists after logout", () => {
    let loginPage: LoginPage;
    let inventory: InventoryPage;
    let card: CardPage;

    const items = [
        {id: "sauce-labs-bolt-t-shirt", name: "Sauce Labs Bolt T-Shirt"},
        {id: "sauce-labs-fleece-jacket", name: "Sauce Labs Fleece Jacket"}
    ];

    beforeEach(async () => {
        loginPage = new LoginPage();
        inventory = new InventoryPage();
        card = new CardPage();

        await loginPage.open();
        await loginPage.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);
    })

    it("should keep cart after logout", async () => {
        for (const i of items) await inventory.addToCart(i.id);
        await expect(inventory.cartBadge).toHaveText(String(items.length));

        await inventory.openMenu();
        await inventory.logout();

        await browser.waitUntil(async () => (await browser.getUrl()).includes("/"), {
            timeout: 5000,
            timeoutMsg: "URL does not contain \"/\""
        });

        await loginPage.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);

        await expect(inventory.cartBadge).toHaveText(String(items.length));

        await inventory.cartLink.click();
        const names = await card.getNames();
        expect(names).toEqual(items.map(i => i.name));
    });
});