import { expect, $ } from '@wdio/globals';

export default class CheckoutCompletePage {
    get header() { return $('[data-test="complete-header"]'); }
    get backHome(){ return $('[data-test="back-to-products"]'); }

    async assertLoaded() {
        await expect(this.header).toHaveText("Thank you for your order");
    }

    async backToProducts() { await this.backHome.click(); }
}
