import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CardPage from '../pageobjects/card.page';

describe('Checkout without products', () => {
    let login: LoginPage;
    let inv: InventoryPage;
    let card: CardPage;

    beforeEach(async () => {
        login = new LoginPage;
        inv = new InventoryPage;
        card = new CardPage;

        await browser.url('/');
        await  login.login(process.env.USERNAME_LOGIN!, process.env.PASSWORD_LOGIN!);
    });

    it('should show empty cart and handle checkout click', async () => {
        await inv.openCart();
        await card.assertLoaded();
        await card.assertEmpty();

        await card.checkout();
        await card.assertLoaded();
        await expect(card.emptyError).toBeDisplayed();
        await expect(card.emptyError).toHaveText("Cart is empty");
    });
});