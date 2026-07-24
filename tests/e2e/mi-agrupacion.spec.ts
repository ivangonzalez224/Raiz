import { test, expect } from "@playwright/test";

test("mi-agrupacion pide iniciar sesión si no hay usuario logueado", async ({ page }) => {
  await page.goto("/mi-agrupacion");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "Primero, ingresa" })).toBeVisible();
  await expect(
    main.getByText("Necesitas iniciar sesión para ver tus agrupaciones."),
  ).toBeVisible();

  await main.getByRole("link", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/ingresar/);
});

test("la edición de una agrupación específica también exige sesión", async ({ page }) => {
  await page.goto("/mi-agrupacion/cualquier-slug-de-prueba");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "Primero, ingresa" })).toBeVisible();
  await expect(
    main.getByText("Necesitas iniciar sesión para editar esta ficha."),
  ).toBeVisible();
});
