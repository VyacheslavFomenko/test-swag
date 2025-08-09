import {expect} from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import InventoryPage from "../pageobjects/inventory.page";
import FooterPage from "../pageobjects/footer.page";

describe("Footer links open in new tab", () => {
    const login = new LoginPage();
    const inv = new InventoryPage();
    const footer = new FooterPage();

    beforeEach(async () => {
        await login.open();
        await login.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);
        await inv.assertLoaded();
        await expect(footer.root).toBeDisplayed();
        await expect($('#inventory_container')).toBeDisplayed();
    });

    it("Twitter", async () => {
        await footer.clickAndAssertNewTab(footer.twitter, "twitter.com");
    });

    it("Facebook", async () => {
        await footer.clickAndAssertNewTab(footer.facebook, "facebook.com");
    });

    it("LinkedIn", async () => {
        await footer.clickAndAssertNewTab(footer.linkedin, "linkedin.com");
    });
});