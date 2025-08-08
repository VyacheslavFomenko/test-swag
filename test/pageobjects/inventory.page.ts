import {ChainablePromiseElement} from 'webdriverio';

export default class InventoryPage {
    private get inventoryContainer(): ChainablePromiseElement {
        return $("#inventory_container");
    }

    private get menuButton(): ChainablePromiseElement {
        return $("#react-burger-menu-btn")
    }

    private get logoutBtn(): ChainablePromiseElement {
        return $("#logout_sidebar_link")
    }

    public async openMenu(): Promise<void> {
        await this.menuButton.waitForClickable({ timeout: 5000 });
        await this.menuButton.click();
    }

    public async logout(): Promise<void> {
        await this.logoutBtn.waitForClickable({ timeout: 5000 });
        await this.logoutBtn.click();
    }

    public async isDisplay(): Promise<boolean> {
        return this.inventoryContainer.isDisplayed();
    }
}
