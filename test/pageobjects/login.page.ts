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

    public async login(userName: string, password: string) {
        await this.inputUsername.setValue(userName);
        await this.inputPassword.setValue(password);
        await this.submit.click();
    }
}
