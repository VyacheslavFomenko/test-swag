import { $, browser} from "@wdio/globals";
import type { ChainablePromiseElement } from "webdriverio";

export default class FooterPage {
    public get root(): ChainablePromiseElement {
        return $("[data-test='footer']");
    }
    public get twitter()  { return $("[data-test='social-twitter']"); }
    public get facebook() { return $("[data-test='social-facebook']"); }
    public get linkedin() { return $("[data-test='social-linkedin']"); }

    public async clickAndAssertNewTab(
        el: ChainablePromiseElement,
        urlPart: string
    ): Promise<void> {
        await this.root.scrollIntoView();
        const mainHandle = await browser.getWindowHandle();
        const before = await browser.getWindowHandles();

        await el.click();

        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > before.length,
            { timeout: 5000, timeoutMsg: "New tab didn't open" }
        );

        const handles = await browser.getWindowHandles();
        const newHandle = handles.find(h => h !== mainHandle)!;

        await browser.switchToWindow(newHandle);

        await browser.waitUntil(async () => (await browser.getUrl()).includes(urlPart), {
            timeout: 5000,
            timeoutMsg: 'URL does not contain "/"'
        });

        await browser.closeWindow();
        await browser.switchToWindow(mainHandle);
    }
}
