import {ChainablePromiseElement} from 'webdriverio';
import {$} from '@wdio/globals';

export default class LoginPage {

    public open() {
        return browser.url('https://www.saucedemo.com');
    }

    public get inputUsername(): ChainablePromiseElement {
        return $('#user-name');
    }

    public get inputPassword(): ChainablePromiseElement {
        return $('#password');
    }

    public get submit(): ChainablePromiseElement {
        return $('#login-button');
    }

    public get errorContainer(): ChainablePromiseElement {
        return $("error-message-container");
    }

    public get errorIcon(): ChainablePromiseElement {
        return $(".error-button");
    }

    public get errorText(): ChainablePromiseElement {
        return $("h3[data-test=\"error\"]");
    }

    public async login(userName: string, password: string) {
        await this.inputUsername.setValue(userName);
        await this.inputPassword.setValue(password);
        await this.submit.click();
    }

    public async getUsernameValue(): Promise<string> {
        return this.inputUsername.getValue();
    }

    public async getPasswordValue(): Promise<string> {
        return this.inputPassword.getValue();
    }
}
