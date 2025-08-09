export default class CardPage {
    public get container() { return $('#cart_contents_container'); }
    public get checkoutBtn() { return $('[data-test="checkout"]'); }
    public get emptyError() { return $('[data-test="cart-error"]'); }        // ← подставь свой
    get items() { return $$('[data-test="inventory-item"]'); }

    async assertLoaded() { await expect(this.container).toBeDisplayed(); }

    public get itemName() {
        return $$('//div[contains(@class,"cart_item")]//div[contains(@class,"inventory_item_name")]');
    }

    async getNames(): Promise<string[]> {
        const els = await this.itemName;
        const texts = [];
        for (const el of els) {
            texts.push(await el.getText());
        }
        return texts;
    }

    async itemPrices(): Promise<number[]> {
        const texts = await $$('[data-test="inventory-item-price"]').map(el => el.getText());
        return texts.map(money);
    }

    async itemSubtotal(): Promise<number> {
        const text = await $('[data-test="subtotal-label"]').getText(); // "Item total: $39.98"
        return money(text);
    }

    async checkout() { await this.checkoutBtn.click(); }

    async assertEmpty() {
        await expect(this.items).toBeElementsArrayOfSize(0);
    }
}

const money = (s: string) => Number(s.replace(/[^\d.]/g, ''));