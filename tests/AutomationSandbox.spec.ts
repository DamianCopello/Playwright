import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

let url = "https://thefreerangetester.github.io/sandbox-automation-testing/";


test.describe('Automation Sandbox', () => {

    let sandbox: SandboxPage;

    test.beforeEach(async ({ page }) => {          // <-- inicialización por test
        sandbox = new SandboxPage(page);
    });

    test('Validate I can click on button w/dynamic ID', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N001' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        });

        await test.step('A message appears when I click on the button', async () => {
            await sandbox.clickDynamicButton();
            await expect(sandbox.OMGMessage, 'Message does not appear').toBeVisible();
        });
    });

    test('Validate I can fill a text field', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N002' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can fill the text field', async () => {
            await expect(sandbox.textField, 'Field is not editable').toBeEditable();
            await sandbox.textField.fill('Hola Mundo');
            await expect(sandbox.textField, 'Input text is not visible').toHaveValue('Hola Mundo');
        })
    });

    test('Validate I can select/Unselect options from a Checkbox', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N003' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can check more than one option from the Checkbox', async () => {
            await sandbox.checkPasta();
            await sandbox.checkHamburg();
            await expect(sandbox.pastaCheckbox, 'Was not checked').toBeChecked();
            await expect(sandbox.hamburgCheckbox, 'Was not checked').toBeChecked();
        });
        await test.step('I can uncheck an option from the Checkbox', async () => {
            await sandbox.uncheckPasta();
            await expect(sandbox.pastaCheckbox, 'Was checked').toBeChecked({ checked: false });
        });
    });

    test('Validate I can select a Radiobutton', async ({ page, browserName }) => {
        //test.skip(browserName === 'webkit', 'Skipping test on WebKit');

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N004' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can select a Radionbutton', async () => {
            await sandbox.radioButtonYes.check();
            await expect(sandbox.radioButtonYes, 'Si option is not selected').toBeChecked();
        })
    });

    test('Validate I can select an item from a dropdown', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N005' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can select a sport', async () => {
            await sandbox.dropdownValue.selectOption('Fútbol');
            await expect(sandbox.dropdownValue, 'Fútbol is not selected').toHaveValue('Fútbol');
        })
    });

    test('Validate I can select an item from a different dropdown', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N006' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can pick a day of the week', async () => {
            await sandbox.diaDeLaSemana.click();
            await page.getByRole('link', { name: 'Miércoles' },).click();
        })
    });

    test('Validate that Dropdown contains expected values', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N007' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I validate that the dropdown list contains the expected sports', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball']
            //Iterate over the array to validate each option is present in the dropdown
            for (let opcion of deportes) {
                const element = page.getByRole('option', { name: opcion });
                if (element) {
                    console.log(`'${opcion}' is present.`);
                } else {
                    throw new Error(`'${opcion}' is not present.`);
                }
            }
        })
    })

    test('Validate that column Nombre contains expected values in an static table', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N008' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can validate that the column Nombre has the correct values', async () => {
            //Create an array with all the values from the Nombre column
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            //Expected names in the Nombre column
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        })
    })

    test('Validate that all values change after a reload in a dynamic table', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N009' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can validate that all values changed after a reload', async () => {
            //Create an array wioth all the values from the dynamic table
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresTablaDinamica);

            //Reload to change values
            await page.reload();

            //Create a second array with the new values from the table
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresPostReload);

            //Validate that all values changed from first array to second array
            expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
        })
    })

    test.skip('Validate that all checkbox values are correct', async ({ page }) => {
        //This test is skipped with an annotation. Other annotations are test.only and test.fixme

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N010' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('I can validate that all checkbox values are correct', async () => {
            //Soft assertions to validate all checkbox options are present
            await expect.soft(page.getByText('Pizza 🍕'), 'Pizza 🍕 not found').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'), 'Hamburguesa 🍔 not found').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'Pasta 🍝 not found').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'Helado 🍧 not found').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'Torta 🍰 not found').toBeVisible();
        })
    })

    test('Validate that pop contains expected element', async ({ page }) => {

        test.info().annotations.push({ type: 'User Story 001', description: 'Requirement N011' });

        await test.step('Given that I navigate to Automation Sandbox', async () => {
            await page.goto(url);
        })
        await test.step('When I click on the popup button', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        })
        await test.step('I can validate the element within it', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
        })
        await test.step('I can close the popup', async () => {
            await page.getByRole('button', { name: 'Cerrar' }).click();
            await expect(page.getByRole('button', { name: 'Cerrar' }), 'Popup was not closed').not.toBeVisible();

        })


    })
});