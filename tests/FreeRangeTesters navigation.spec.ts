import { test, expect } from '@playwright/test';

test.describe('Navegation in freerangetesters.com', () => {

  const sections = [
    { name: 'Cursos', url: 'https://www.freerangetesters.com/cursos', title: 'Cursos' },
    { name: 'Recursos', url: 'https://www.freerangetesters.com/recursos', title: 'Recursos' },
    { name: 'Academia', url: 'https://www.freerangetesters.com/academia', title: 'Academia' },
    { name: 'Mentorías', url: 'https://www.freerangetesters.com/mentoria-1-1-con-pato', title: 'Mentoría personalizada de avance de carrera para testers de software' },
    { name: 'Talleres', url: 'https://www.freerangetesters.com/talleres-y-webinars', title: 'Webinars en vivo' },
    { name: 'Blog', url: 'https://www.freerangetesters.com/blog', title: 'Free Range Testers' },
  ];

  for (const section of sections) {
    test(`Validate redirection to section "${section.name}"`, async ({ page }) => {

      await test.step('Given I am in the url for freerangetesters.com', async () => {
        await page.goto('https://www.freerangetesters.com');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      await test.step(`When I click on "${section.name}"`, async () => {
        await page.locator('#page_header').getByRole('link', { name: section.name, exact: true }).click();
        await page.waitForURL(`${section.url}`);
      });

      await test.step(`Then I see the page "${section.title}"`, async () => {
        await expect(page).toHaveTitle(section.title);
      });

    });
  }

});
