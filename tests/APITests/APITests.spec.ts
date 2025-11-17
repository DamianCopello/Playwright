import { test, expect } from '@playwright/test';

const REPO = 'APITesting';
const USER = 'DamianCopello';

test('Validate I can create an Issue in this repo', async ({ request }) => {
    // We use 'request' within async instead of page because we are testing API
    const newIssueResponse = await request.post(`/repos/${USER}/${REPO}/issues`, {  
        data: {
            title: '[BUG] Issue created via Playwright API',
            body: 'This is a test issue created using Playwright API testing capabilities.',
        },
    });
    expect(newIssueResponse.status()).toBe(201);

 const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[BUG] Issue created via Playwright API',
        body: 'This is a test issue created using Playwright API testing capabilities.'
     }));
});

test('Validate I can create a Feature in this repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Issue created via Playwright API',
            body: 'This is a test issue created using Playwright API testing capabilities.'
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Issue created via Playwright API',
        body: 'This is a test issue created using Playwright API testing capabilities.'
    }));
});
 
test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});