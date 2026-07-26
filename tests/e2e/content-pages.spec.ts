import { test, expect } from "@playwright/test";

test("la navegación entre las páginas de contenido funciona de punta a punta", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("No es una dieta");

  await page.getByRole("link", { name: /Ética: dejar de ver/ }).click();
  await expect(page).toHaveURL(/\/etica$/);
  await expect(
    page.getByRole("heading", { name: "El rechazo al especismo" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Siguiente: nutrición →" }).click();
  await expect(page).toHaveURL(/\/nutricion$/);
  await expect(
    page.getByRole("heading", { name: "La pregunta que más te van a hacer" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Siguiente: otras dudas →" }).click();
  await expect(page).toHaveURL(/\/dudas$/);
  await expect(
    page.getByRole("heading", { name: "Cosmética, ropa y más" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Ver el directorio de activismo →" }).click();
  await expect(page).toHaveURL(/\/directorio$/);
});

test("el acordeón de dudas frecuentes se puede abrir", async ({ page }) => {
  await page.goto("/dudas");

  const question = page.getByText("¿Qué hace que un cosmético no sea vegano?");
  await expect(question).toBeVisible();

  await question.click();
  await expect(
    page.getByText(/ingredientes de origen animal \(carmín, colágeno/),
  ).toBeVisible();
});
