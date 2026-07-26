import { test, expect } from "@playwright/test";

test("la home carga y muestra el hero de ética", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("se puede navegar al directorio", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Directorio", exact: true })
    .click();
  await expect(page).toHaveURL(/directorio/);
});
