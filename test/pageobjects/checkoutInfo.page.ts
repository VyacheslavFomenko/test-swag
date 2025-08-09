import { $, expect } from '@wdio/globals';

export default class CheckoutInfoPage {
    get container() { return $('[data-test="checkout-info-container"]'); }
    get firstName() { return $('[data-test="firstName"]'); }
    get lastName()  { return $('[data-test="lastName"]'); }
    get postal()    { return $('[data-test="postalCode"]'); }
    get continueBtn(){ return $('[data-test="continue"]'); }

    async assertLoaded() { await expect(this.container).toBeDisplayed(); }

    async fill(data: {first: string; last: string; zip: string}) {
        await this.firstName.setValue(data.first);
        await this.lastName.setValue(data.last);
        await this.postal.setValue(data.zip);
    }

    async continue() { await this.continueBtn.click(); }
}
