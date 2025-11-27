import { test, expect } from '@playwright/test';
 
const REPO = 'Playwright';
const USER = 'DamianCopello';
 
test('I can create an issue in my repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Everything is wrong',
            body: 'We re all going to dieeee!!!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
});
 
test('I can create a feature in my repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] I want icecream',
            body: 'It would be nice to have icecream 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
});
 