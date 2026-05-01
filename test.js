// import puppeteer
const puppeteer = require("puppeteer");

async function go() {
  // launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  // open a new tab
  const page = await browser.newPage();

  // go to site to be tested
  await page.goto(""); // change if deployed

  // click sign-in button
  await page.click("#signinbtn"); // make sure this ID is correct

  // provide email and password to sign in
  await page.type("#email_", "test@email.com");
  await page.type("#password_", "123456");

  // click the submit button
  await page.click("#login_submit"); // replace with your actual selector

  // wait for login to complete
  await new Promise((r) => setTimeout(r, 1500));

  // search for a meal
  await page.type("#search_bar", "chicken");
  await page.click("#search_button");

  // wait for results to load
  await new Promise((r) => setTimeout(r, 1500));

  // click "Add to Meal Plan" on first recipe
  await page.click(".recipe-card:first-child.add-to-meal-plan-button");

  // wait for it to be added
  await new Promise((r) => setTimeout(r, 1500));

  // go to meal plan page
  await page.click("#meal_plan_nav");

  // wait for page load
  await new Promise((r) => setTimeout(r, 1500));

  // close browser after finishing
  await new Promise((r) => setTimeout(r, 10000));
  await browser.close();
}

// call the function
go();
