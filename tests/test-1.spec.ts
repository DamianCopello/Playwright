import { test, Browser, Page, expect } from '@playwright/test';

test.describe('Navegación en freerangetesters.com', () => {

const secciones = [
  { nombre: 'Cursos', url: 'https://www.freerangetesters.com/cursos', titulo: 'Cursos' },
  { nombre: 'Recursos', url: 'https://www.freerangetesters.com/recursos', titulo: 'Recursos' },
  { nombre: 'Academia', url: 'https://www.freerangetesters.com/academia', titulo: 'Academia' },
  { nombre: 'Mentorías', url: 'https://www.freerangetesters.com/mentoria-1-1-con-pato', titulo: 'Mentoría personalizada de avance de carrera para testers de software' },
  { nombre: 'Talleres', url: 'https://www.freerangetesters.com/talleres-y-webinars', titulo: 'Webinars en vivo' },
  { nombre: 'Blog', url: 'https://www.freerangetesters.com/blog', titulo: 'Free Range Testers' },
  
];

for (const seccion of secciones) {
  test(`Validar redirecciones a la sección "${seccion.nombre}"`, async ({ page }) => {

    await test.step('Estando yo en la web principal de freerangetesters.com', async () => {
      await page.goto('https://www.freerangetesters.com');
      await expect(page).toHaveTitle('Free Range Testers');
    });

    await test.step('Cuando hago click en "${seccion.nombre}"', async () => {
      await page.locator('#page_header').getByRole('link', {name: seccion.nombre, exact: true}).click();
      await page.waitForURL(`${seccion.url}`);
    });

    await test.step('Entonces veo la página de "$(seccion.titulo)"', async () => {
      await expect(page).toHaveTitle(seccion.titulo);
    });

  });
}});
