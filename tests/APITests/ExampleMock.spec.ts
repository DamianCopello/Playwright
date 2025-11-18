import { test, expect } from '@playwright/test';
test("Create a mock of a fruit that isn't in the list", async ({ page }) => {
    // Here we intercept the API call and provide a mock response
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Mandarina', id: 26 }];
        await route.fulfill({ json });
    });
    // Now we navigate to the page that makes the API call
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    // We verify that our mocked fruit is displayed on the page
    await expect(page.getByText('Mandarina')).toBeVisible();
});

test('Obtain real list plus something I added', async ({ page }) => {
    // Intercept the API call and modify the response
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Mandarina', id: 200 });
        // We add an extra fruit to the real response
        await route.fulfill({ response, json });
    });
 
    // Navigate to the page that makes the API call
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    // Verify that the added fruit is displayed on the page along with the real list
    await expect(page.getByText('Mandarina', { exact: true })).toBeVisible();
});