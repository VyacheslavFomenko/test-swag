import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page'
import InventoryPage from "../pageobjects/inventory.page";
import {faker} from '@faker-js/faker';

describe("Test Login flow", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();

        await loginPage.open();
    });

    it("should login with valid credentials", async () => {
        await loginPage.login(process.env.USERNAME_LOGIN || "standard_user", process.env.PASSWORD_LOGIN || "secret_sauce");
        expect(await inventoryPage.isDisplay()).toBe(true);
    });

    it("should show error with invalid password", async () => {
        const password = faker.internet.password();

        await loginPage.login(process.env.USERNAME_LOGIN!, password); //JSON.stringify(process.env.USERNAME), JSON.stringify(process.env.PASSWORD)
        await expect(loginPage.errorIcon).toBeDisplayed();
        await expect(loginPage.errorText).toHaveText(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("should show error with invalid login", async () => {
        const login = faker.internet.username();

        await loginPage.login(login, process.env.PASSWORD_LOGIN!); //JSON.stringify(process.env.USERNAME), JSON.stringify(process.env.PASSWORD)
        await expect(loginPage.errorIcon).toBeDisplayed();
        await expect(loginPage.errorText).toHaveText(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });
});

