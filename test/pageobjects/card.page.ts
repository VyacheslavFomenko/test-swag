export default class CardPage {
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
}