Swag Labs E2E Tests (WebdriverIO + TypeScript + POM)

End‑to‑end UI tests for the public **Swag Labs** demo shop (saucedemo.com), written with **WebdriverIO**, **TypeScript**, and the **Page Object Model (POM)**.

The suite covers happy paths and a few negative cases, including:
- Add items to cart and complete checkout
- External footer links open in a new tab
- Checkout overview totals match item prices
- Checkout without products shows the expected error

---

## 1) Requirements

- **Node.js** ≥ 18.x (LTS recommended)
- **npm** or **pnpm/yarn** (examples below use npm)
- **Google Chrome** (or Chromium) installed locally
- Internet access (tests run against the live demo site)

> Check your versions:
>
> ```bash
> node -v
> npm -v
> google-chrome --version # or chrome version from UI
> ```

---

## 2) Getting started

```bash
git clone <this-repo-url>
cd <repo-folder>
npm ci   # or: npm install
```

Create a `.env` file in the project root (used by the login flow):

```dotenv
USERNAME_LOGIN=standard_user
PASSWORD_LOGIN=secret_sauce
```

> The credentials above are the official demo credentials for saucedemo.com.

---

## 3) Run tests

### Run the whole suite
```bash
npx wdio run ./wdio.conf.ts
```

### Run a single spec
```bash
npx wdio run ./wdio.conf.ts --spec test/specs/checkout.e2e.ts
```

### Run multiple specific specs
```bash
npx wdio run ./wdio.conf.ts --spec test/specs/checkout.e2e.ts,test/specs/footer-links.e2e.ts
```

> If you added npm scripts (optional), you can also run:
>
> ```jsonc
> // package.json
> "scripts": {
>   "test": "wdio run ./wdio.conf.ts",
>   "test:spec": "wdio run ./wdio.conf.ts --spec"
> }
> ```

---

## 4) Project structure

```
test/
  specs/
    checkout.e2e.ts           
    checkout-empty.e2e.ts     
    footer-links.e2e.ts       
  pageobjects/
    login.page.ts
    inventory.page.ts
    cart.page.ts
    checkoutInfo.page.ts
    checkoutOverview.page.ts
    checkoutComplete.page.ts
    footer.page.ts
  helpers/
    money.ts                  
wdio.conf.ts                  
tsconfig.json                 
.env                          
```