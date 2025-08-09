import LoginPage from "../pageobjects/login.page";
import InventoryPage from "../pageobjects/inventory.page";
import CardPage from "../pageobjects/card.page";
import CheckoutCompletePage from "../pageobjects/checkoutComplete.page";
import CheckoutInfoPage from "../pageobjects/checkoutInfo.page";
import CheckoutOverviewPage from "../pageobjects/checkoutOverview.page";

const rnd = (len = 6) => Math.random().toString(36).slice(2, 2 + len);
const moneySum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

describe("Checkout flow", () => {
    let loginPage: LoginPage;
    let inventory: InventoryPage;
    let card: CardPage;
    let checkoutCompletePage: CheckoutCompletePage;
    let checkoutInfoPage: CheckoutInfoPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    before(async () => {
        loginPage = new LoginPage();
        inventory = new InventoryPage();
        card = new CardPage();
        checkoutCompletePage = new CheckoutCompletePage();
        checkoutInfoPage = new CheckoutInfoPage();
        checkoutOverviewPage = new CheckoutOverviewPage();

        await loginPage.open();
        await loginPage.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);
        await inventory.assertLoaded();
    });

    it("should successful pass checkout", async () => {
        await inventory.addBackpack();
        await inventory.expectCartCount(1);
        await inventory.addBikeLight();
        await inventory.expectCartCount(2);

        await inventory.openCart();
        await card.assertLoaded();
        const cartNames = await card.getNames();
        const cartPrices = await card.itemPrices();

        await card.checkout();
        await checkoutInfoPage.assertLoaded();

        await checkoutInfoPage.fill({ first: rnd(), last: rnd(), zip: String(10000 + Math.floor(Math.random()*89999)) });
        await checkoutInfoPage.continue();

        await checkoutOverviewPage.assertLoaded();
        const ovNames   = await checkoutOverviewPage.itemNames();
        const ovPrices  = await checkoutOverviewPage.itemPrices();
        const ovSubtotal= await checkoutOverviewPage.itemSubtotal();

        await expect(ovNames).toEqual(cartNames);
        await expect(ovPrices).toEqual(cartPrices);

        await expect(ovSubtotal).toBeCloseTo(moneySum(ovPrices), 2);

        await checkoutOverviewPage.finish();

        await checkoutCompletePage.assertLoaded();

        await checkoutCompletePage.backToProducts();
        await inventory.assertLoaded();
        await expect(inventory.cartBadge).not.toBeExisting();
    });
});