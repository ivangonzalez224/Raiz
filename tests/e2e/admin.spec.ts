import { test, expect } from "@playwright/test";

test("el panel de admin pide iniciar sesión si no hay usuario logueado", async ({
  page,
}) => {
  await page.goto("/admin/agrupaciones");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "Primero, ingresa" })).toBeVisible();
  await expect(
    main.getByText("Esta sección es solo para administradores."),
  ).toBeVisible();

  await main.getByRole("link", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/ingresar/);
});
