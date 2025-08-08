import { ChainablePromiseElement } from 'webdriverio';

export default class InventoryPage {
    private get inventoryContainer(): ChainablePromiseElement{
        return $("#inventory_container");
    }

    public async isDisplay(): Promise<boolean> {
        return this.inventoryContainer.isDisplayed();
    }
}
