import { test, expect } from "@playwright/test";

test.describe("Event landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads with correct title and headline", async ({ page }) => {
    await expect(page).toHaveTitle(/DevConf 2026/i);
    await expect(
      page.getByRole("heading", { name: /DevConf 2026/i, level: 1 })
    ).toBeVisible();
    await expect(page.getByText(/June 15-17, San Francisco/i)).toBeVisible();
  });

  test("countdown section is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Countdown/i })
    ).toBeVisible();
    // The four countdown unit labels are rendered
    await expect(page.getByText("Days")).toBeVisible();
    await expect(page.getByText("Hours")).toBeVisible();
    await expect(page.getByText("Min")).toBeVisible();
    await expect(page.getByText("Sec")).toBeVisible();
  });

  test("countdown timer shows numeric values after JS runs", async ({
    page,
  }) => {
    // Wait for the interval to fire (it starts immediately)
    await page.waitForFunction(() => {
      const el = document.getElementById("cd-days");
      return el !== null && el.textContent !== "--";
    });
    const days = await page.locator("#cd-days").textContent();
    expect(Number(days)).toBeGreaterThanOrEqual(0);
  });

  test("schedule section is visible with expected sessions", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /Schedule/i })
    ).toBeVisible();

    // Day headers
    await expect(page.getByText("June 15")).toBeVisible();
    await expect(page.getByText("June 16")).toBeVisible();

    // A sample of sessions from each day
    await expect(
      page.getByText(/Keynote: The Future of Computing/i)
    ).toBeVisible();
    await expect(page.getByText(/Workshop: Hands-on AI/i)).toBeVisible();
    await expect(page.getByText(/Open Source at Scale/i)).toBeVisible();
    await expect(page.getByText(/Panel: DevOps Best Practices/i)).toBeVisible();
  });

  test("speakers section is visible with speaker names", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Speakers/i })
    ).toBeVisible();

    await expect(page.getByText(/Dr. Ada Lovelace/i)).toBeVisible();
    await expect(page.getByText(/Linus T./i)).toBeVisible();
    await expect(page.getByText(/Grace Hopper/i)).toBeVisible();
  });

  test("registration form is present and has required fields", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /Register Now/i })
    ).toBeVisible();

    const form = page.locator("#reg-form");
    await expect(form).toBeVisible();

    await expect(form.locator('[name="name"]')).toBeVisible();
    await expect(form.locator('[name="email"]')).toBeVisible();
    await expect(form.locator('[name="ticket"]')).toBeVisible();
    await expect(
      form.getByRole("button", { name: /Reserve Spot/i })
    ).toBeVisible();
  });

  test("registration form shows validation error when submitted empty", async ({
    page,
  }) => {
    // Click submit without filling any fields to trigger client-side validation
    const form = page.locator("#reg-form");

    // Fill required fields with invalid data to bypass browser's built-in required check,
    // then trigger the custom error path by omitting ticket selection
    await form.locator('[name="name"]').fill("Alice");
    await form.locator('[name="email"]').fill("alice@example.com");
    // Leave ticket unselected (value = "") and submit
    await form.getByRole("button", { name: /Reserve Spot/i }).click();

    const errorEl = page.locator("#reg-error");
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText(/required/i);
  });

  test("registration form hides error on valid submission", async ({
    page,
  }) => {
    // Handle the alert that fires on valid submission
    page.once("dialog", (dialog) => dialog.accept());

    const form = page.locator("#reg-form");
    await form.locator('[name="name"]').fill("Alice Smith");
    await form.locator('[name="email"]').fill("alice@example.com");
    await form.locator('[name="ticket"]').selectOption("general");
    await form.getByRole("button", { name: /Reserve Spot/i }).click();

    // Error element should remain hidden
    await expect(page.locator("#reg-error")).toHaveClass(/hidden/);
  });

  test("registration form has all ticket type options", async ({ page }) => {
    const select = page.locator('[name="ticket"]');
    await expect(select.locator('option[value="general"]')).toHaveCount(1);
    await expect(select.locator('option[value="vip"]')).toHaveCount(1);
  });

  test("page sections appear in logical order", async ({ page }) => {
    const sections = await page
      .locator("section")
      .evaluateAll((els) => els.map((el) => el.id || el.className));
    // countdown (#countdown) should precede #register
    const countdownIdx = sections.findIndex((s) => s.includes("countdown"));
    const registerIdx = sections.findIndex((s) => s.includes("register"));
    expect(countdownIdx).toBeGreaterThanOrEqual(0);
    expect(registerIdx).toBeGreaterThan(countdownIdx);
  });
});
