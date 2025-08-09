import {ChainablePromiseElement} from 'webdriverio';

export default class InventoryPage {
    private get inventoryContainer(): ChainablePromiseElement {
        return $("#inventory_container");
    }

    public get cartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    public get cartLink() {
        return $('[data-test="shopping-cart-link"]');
    }

    private get menuButton(): ChainablePromiseElement {
        return $("#react-burger-menu-btn")
    }

    public get sortSelect(): ChainablePromiseElement {
        return $("[data-test='product-sort-container']");
    }

    private get logoutBtn(): ChainablePromiseElement {
        return $("#logout_sidebar_link")
    }

    public addToCartBtn(id: string): ChainablePromiseElement {
        return $(`#add-to-cart-${id}`);
    }

    public get itemNames() {        // список названий
        return $$("div.inventory_item_name");
    }

    public get itemPrices() {       // список цен
        return $$("[data-test='inventory-item-price'], .inventory_item_price");
    }

    public async addToCart(id: string): Promise<void> {
        await this.addToCartBtn(id).click();
    }

    public async openMenu(): Promise<void> {
        await this.menuButton.waitForClickable({timeout: 5000});
        await this.menuButton.click();
    }

    public async logout(): Promise<void> {
        await this.logoutBtn.waitForClickable({timeout: 5000});
        await this.logoutBtn.click();
    }

    public async isDisplay(): Promise<boolean> {
        return this.inventoryContainer.isDisplayed();
    }

    public async setSort(value: string): Promise<void> {
        await this.sortSelect.selectByAttribute("value", value);
    }

    public async getNames(): Promise<string[]> {
        const els = await this.itemNames;
        const arr: string[] = [];
        for (const el of els) arr.push((await el.getText()).trim());
        return arr;
    }

    public async getPrices(): Promise<number[]> {
        const els = await this.itemPrices;
        const arr: number[] = [];
        for (const el of els) {
            const raw = (await el.getText()).trim();
            arr.push(parseFloat(raw.replace("$", "")));
        }
        return arr;
    }

    public async assertLoaded(): Promise<void> {
        await expect(this.inventoryContainer).toBeDisplayed();
    }

    async badgeCount(): Promise<number> {
        const exists = await this.cartBadge.isExisting();
        return exists ? parseInt(await this.cartBadge.getText(), 10) : 0;
    }

    public addToCartById = async (slug: string) => {
        await $(`[data-test="add-to-cart-${slug}"]`).click();
    };

    public addBackpack = () => this.addToCartById('sauce-labs-backpack');

    public addBikeLight = () => this.addToCartById('sauce-labs-bike-light');

    async openCart() {
        await $('[data-test="shopping-cart-link"]').click();
    }

    async expectCartCount(n: number) {
        await expect(this.cartBadge).toHaveText(String(n));
    }
}
