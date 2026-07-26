import { test, expect } from "@playwright/test";

test("los filtros del directorio actualizan la URL y muestran el estado vacío", async ({
  page,
}) => {
  await page.goto("/directorio");

  await expect(
    page.getByRole("heading", { name: "Grassroots vegano, ciudad por ciudad." }),
  ).toBeVisible();

  const activitySelect = page.locator('select[name="activity"]');
  await activitySelect.selectOption("CUBE_OF_TRUTH");

  await expect(page).toHaveURL(/activity=CUBE_OF_TRUTH/);
  await expect(
    page.getByText("No hay agrupaciones que coincidan con estos filtros."),
  ).toBeVisible();
});

test("la búsqueda por texto actualiza la URL al enviar el formulario", async ({
  page,
}) => {
  await page.goto("/directorio");

  await page.getByPlaceholder("Buscar agrupación...").fill("cubo");
  await page.getByRole("button", { name: "Buscar" }).click();

  await expect(page).toHaveURL(/q=cubo/);
});
