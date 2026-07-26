import { test, expect } from "@playwright/test";

test("el formulario de login muestra error con credenciales inválidas", async ({
  page,
}) => {
  await page.goto("/ingresar");

  await expect(page.getByRole("heading", { name: "Ingresar" })).toBeVisible();

  await page.getByPlaceholder("tu@email.com").fill("no-existe@example.com");
  await page.getByPlaceholder("Contraseña").fill("password-incorrecta");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page.getByText("Email o contraseña incorrectos.")).toBeVisible();
});

test("desde ingresar se puede navegar a crear cuenta", async ({ page }) => {
  await page.goto("/ingresar");

  await page.getByRole("link", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL(/\/crear-cuenta/);
});

test("pide iniciar sesión antes de registrar una agrupación", async ({ page }) => {
  await page.goto("/registrar-agrupacion");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "Primero, ingresa" })).toBeVisible();

  await main.getByRole("link", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/ingresar/);
});
