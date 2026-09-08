import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shipped styles size inputs without an app reset", async ({ page }) => {
  for (const [name, height] of [
    ["Default input", 36],
    ["Compact input", 28],
  ] as const) {
    const input = page.getByRole("textbox", { name });
    await expect(input).toHaveCSS("box-sizing", "border-box");
    expect(
      await input.evaluate((el) => el.getBoundingClientRect().width),
    ).toBeCloseTo(200, 0);
    expect(
      await input.evaluate((el) => el.getBoundingClientRect().height),
    ).toBeCloseTo(height, 0);
  }
  await expect(page.getByTestId("unrelated")).toHaveCSS(
    "box-sizing",
    "content-box",
  );
  await expect(
    page.getByRole("textbox", { name: "Quantity" }),
  ).toHaveAccessibleDescription("At least one.");
});

for (const sizing of ["max-height-scroll", "fixed-height-scroll"]) {
  test(`ScrollArea scrolls with ${sizing}`, async ({ page }) => {
    const viewport = page
      .getByTestId(sizing)
      .locator(".ub-scroll-area-viewport");
    expect(await viewport.evaluate((el) => el.clientHeight)).toBe(100);
    await viewport.focus();
    await page.keyboard.press("End");
    await expect
      .poll(() => viewport.evaluate((el) => el.scrollTop))
      .toBeGreaterThan(0);
    await expect(
      page
        .getByTestId(sizing)
        .locator('[data-orientation="vertical"].ub-scroll-area-scrollbar'),
    ).toBeVisible();
  });
}

test("vertical slider follows pointer and keyboard along its full height", async ({
  page,
  isMobile,
}) => {
  const root = page.getByTestId("vertical");
  const track = root.locator(".ub-slider-track");
  await track.scrollIntoViewIfNeeded();
  const box = (await track.boundingBox())!;
  expect(box.height).toBeCloseTo(200, 0);
  expect(box.width).toBeCloseTo(4, 0);
  if (isMobile) {
    await page.touchscreen.tap(
      box.x + box.width / 2,
      box.y + box.height * 0.25,
    );
  } else {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.25);
  }
  const slider = page.getByRole("slider", { name: "Vertical volume" });
  await expect(slider).toHaveAttribute("aria-valuenow", "75");
  await slider.focus();
  await page.keyboard.press("ArrowUp");
  await expect(slider).toHaveAttribute("aria-valuenow", "76");
  await expect(
    page.getByTestId("horizontal").locator(".ub-slider-track"),
  ).toHaveCSS("height", "4px");
});

for (const theme of ["dark", "matrix", "custom"]) {
  test(`${theme} subtree keeps modal and nested popup surfaces`, async ({
    page,
  }) => {
    await page.getByLabel("Local theme").selectOption(theme);
    const expected = await page
      .getByTestId("expected-glass")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    await page.getByRole("button", { name: "Open themed dialog" }).click();
    const dialog = page.getByRole("dialog", { name: "Themed dialog" });
    await expect(dialog).toHaveCSS("background-color", expected);
    await expect(
      page.getByTestId("theme-scope").getByRole("dialog"),
    ).toBeVisible();
    await page.getByRole("combobox", { name: "Nested choice" }).click();
    await expect(
      page.getByTestId("theme-scope").locator(".ub-select-popup"),
    ).toHaveCSS("background-color", expected);
    await page.getByRole("option", { name: "Two" }).click();
    await page.getByRole("button", { name: "Close dialog" }).click();
    await expect(
      page.getByRole("button", { name: "Open themed dialog" }),
    ).toBeFocused();
    await page.getByRole("combobox", { name: "Local choice" }).click();
    await expect(
      page.getByTestId("theme-scope").locator(".ub-select-popup"),
    ).toHaveCSS("background-color", expected);
  });
}

test("site controls stay in sync when leaving Matrix and following the system", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  const matrix = page.getByRole("switch", { name: "Turn on the matrix theme" });
  await matrix.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
  await expect(matrix).toBeChecked();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(matrix).not.toBeChecked();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme",
    "matrix",
  );
  await matrix.click();
  await matrix.click();
  await expect(
    page.getByRole("button", { name: "Switch to dark mode" }),
  ).toBeVisible();
});
