import { expect, type Locator, type Page } from '@playwright/test';
 
export class SandboxPage {
    readonly page: Page;
    readonly pastaCheckbox: Locator;
    readonly hamburgCheckbox: Locator;
    readonly heladoCheckbox: Locator;
    readonly tortaCheckbox: Locator;
    readonly pizzaCheckbox: Locator;
    readonly dynamicButton: Locator;
    readonly OMGMessage: Locator;
    readonly textField: Locator;
    readonly radioButtonYes: Locator;
    readonly radioButtonNo: Locator;
    readonly dropdownValue: Locator;
    readonly diaDeLaSemana: Locator;
    readonly deporteOption: Locator;
    readonly popupButton: Locator;
    readonly popupMessage: Locator;
    readonly popupClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dynamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.pastaCheckbox = page.getByLabel('Pasta 🍝');
        this.hamburgCheckbox = page.getByLabel('Hamburguesa 🍔');
        this.heladoCheckbox = page.getByLabel('Helado 🍧');
        this.tortaCheckbox = page.getByLabel('Torta 🍰');
        this.pizzaCheckbox = page.getByLabel('Pizza 🍕');
        this.OMGMessage = page.getByText('OMG, aparezco después de 3');
        this.textField = page.getByPlaceholder('Ingresá texto');
        this.radioButtonYes = page.getByRole('radio', { name: 'Si' });
        this.radioButtonNo = page.getByRole('radio', { name: 'No' });
        this.dropdownValue = page.getByLabel('Dropdown')
        this.diaDeLaSemana = page.getByRole('button', { name: 'Día de la semana' });
        this.deporteOption = page.getByRole('option', { name: 'opcion' });
        this.popupButton = page.getByRole('button', { name: 'Mostrar popup' });
        this.popupMessage = page.getByText('¿Viste? ¡Apareció un Pop-up!');
        this.popupClose = page.getByRole('button', { name: 'Cerrar' });
    }
    
    async clickDynamicButton() {
        await expect(this.dynamicButton).toBeVisible();
        await this.dynamicButton.click();
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