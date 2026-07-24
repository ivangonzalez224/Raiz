import { test, expect } from "@playwright/test";

test("el formulario de login muestra confirmación tras enviar el email", async ({
  page,
}) => {
  await page.goto("/ingresar");

  await expect(page.getByRole("heading", { name: "Ingresar" })).toBeVisible();

  await page.getByPlaceholder("tu@email.com").fill("test@example.com");
  await page.getByRole("button", { name: "Enviarme el enlace" }).click();

  await expect(page.getByRole("heading", { name: "Revisa tu correo" })).toBeVisible();
  await expect(page.getByText("test@example.com")).toBeVisible();
});

test("pide iniciar sesión antes de registrar una agrupación", async ({ page }) => {
  await page.goto("/registrar-agrupacion");

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "Primero, ingresa" })).toBeVisible();

  await main.getByRole("link", { name: "Ingresar" }).click();
  await expect(page).toHaveURL(/\/ingresar/);
});
