import { test, expect } from '@playwright/test';

const REPO = 'Playwright';
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
});
