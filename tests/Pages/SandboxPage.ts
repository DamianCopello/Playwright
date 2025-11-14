import { expect, type Locator, type Page } from '@playwright/test';
 
export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;
    readonly hamburgCheckbox: Locator;

 
    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
        this.hamburgCheckbox = page.getByLabel('Hamburguesa 🍔');
    }
 
    async checkPasta() {
        await expect(this.pastaCheckbox).toBeVisible();
        await this.pastaCheckbox.check();
    }
 
    async verifyPastaChecked() {
        expect(this.pastaCheckbox).toBeChecked;
    }

    async uncheckPasta() {
        await expect(this.pastaCheckbox).toBeVisible();
        await this.pastaCheckbox.uncheck();
    }

    async verifyPastaUnchecked() {
        expect(this.pastaCheckbox).toBeChecked({ checked: false });
    }

    async checkHamburg() {
        await expect(this.hamburgCheckbox).toBeVisible();
        await this.hamburgCheckbox.check();
    }
 
    async verifyHamburgChecked() {
        expect(this.hamburgCheckbox).toBeChecked;
    }
}