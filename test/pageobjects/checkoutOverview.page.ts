import { expect, $, $$ } from '@wdio/globals';

const money = (s: string) => Number(s.replace(/[^\d.]/g, ''));

export default class CheckoutOverviewPage {
    get title()    { return $('[data-test="title"]'); }
    get finishBtn(){ return $('[data-test="finish"]'); }
    get subtotal() { return $('[data-test="subtotal-label"]'); } // "Item total: $39.98"

    async assertLoaded(): Promise<void> {
        await expect(this.title).toHaveText('Checkout: Overview');
    }

    async itemNames(): Promise<string[]> {
        const els = await $$('//div[@data-test="inventory-item-name"]');
        return await els.map(el => el.getText());
    }

    async itemPrices(): Promise<number[]> {
        const els   = await $$('//div[@data-test="inventory-item-price"]');
        const texts = await els.map(el => el.getText());
        return texts.map(money);
    }

    async itemSubtotal(): Promise<number> {
        const text = await $('[data-test="subtotal-label"]').getText(); // "Item total: $39.98"
        return money(text);
    }
    async itemTotal(): Promise<number> {
        const txt = await this.subtotal.getText(); // "Item total: $39.98"
        return money(txt);
    }

    async finish(): Promise<void> {
        await this.finishBtn.click();
    }
}