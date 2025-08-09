import {browser, expect} from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import InventoryPage from "../pageobjects/inventory.page";

type Element = number | string;
const isAsc = (a: Element[]) => a.every((v, i) => i === 0 || a[i - 1] <= v);
const isDesc = (a: Element[]) => a.every((v, i) => i === 0 || a[i - 1] >= v);

describe("Products sorting (POM)", () => {
    const login = new LoginPage();
    const inv = new InventoryPage();

    beforeEach(async () => {
        await login.open();
        await login.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);
    });

    it("Name (A → Z)", async () => {
        await inv.setSort("az");
        await browser.waitUntil(async () => isAsc(await inv.getNames()), {timeout: 3000});
        expect(isAsc(await inv.getNames())).toBe(true);
    });

    it("Name (Z → A)", async () => {
        await inv.setSort("za");
        await browser.waitUntil(async () => isDesc(await inv.getNames()), {timeout: 3000});
        expect(isDesc(await inv.getNames())).toBe(true);
    });

    it("Price (low → high)", async () => {
        await inv.setSort("lohi");
        await browser.waitUntil(async () => isAsc(await inv.getPrices()), {timeout: 3000});
        expect(isAsc(await inv.getPrices())).toBe(true);
    });

    it("Price (high → low)", async () => {
        await inv.setSort("hilo");
        await browser.waitUntil(async () => isDesc(await inv.getPrices()), {timeout: 3000});
        expect(isDesc(await inv.getPrices())).toBe(true);
    });
});