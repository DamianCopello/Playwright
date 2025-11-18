import { test, expect } from '@playwright/test';
 
const REPO = 'Playwright';
const USER = 'DamianCopello';
 
test('I can create an issue in my repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Explotó todo',
            body: 'Estamos perdidirijillos!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
});
 
test('I can create a feature in my repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
});
 