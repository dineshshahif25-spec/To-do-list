const puppeteer = require('puppeteer-core');
const path = require('path');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to the app
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(1000);

  // Add some sample tasks for the screenshot
  await page.type('.task-input-field', 'Complete React assignment');
  await page.select('.task-input-select', 'Work');
  await page.evaluate(() => {
    const dateInput = document.querySelector('.task-input-date');
    dateInput.value = '2026-10-15';
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.click('.btn-add');
  await delay(500);

  await page.type('.task-input-field', 'Buy groceries');
  await page.select('.task-input-select', 'Personal');
  await page.click('.btn-add');
  await delay(500);

  await page.type('.task-input-field', 'Submit project report');
  await page.select('.task-input-select', 'Urgent');
  await page.evaluate(() => {
    const dateInput = document.querySelector('.task-input-date');
    dateInput.value = '2026-09-20';
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.click('.btn-add');
  await delay(500);

  // Screenshot 1: Light mode with tasks
  await page.screenshot({
    path: path.join(__dirname, '..', 'docs', 'screenshot-light.png'),
    fullPage: true,
  });

  // Screenshot 2: Dark mode
  await page.click('.theme-toggle');
  await delay(500);
  await page.screenshot({
    path: path.join(__dirname, '..', 'docs', 'screenshot-dark.png'),
    fullPage: true,
  });

  // Screenshot 3: Mobile view (light mode)
  await page.click('.theme-toggle');
  await page.setViewport({ width: 375, height: 667 });
  await delay(500);
  await page.screenshot({
    path: path.join(__dirname, '..', 'docs', 'screenshot-mobile.png'),
    fullPage: true,
  });

  // Screenshot 4: Empty state
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(1000);
  await page.screenshot({
    path: path.join(__dirname, '..', 'docs', 'screenshot-empty.png'),
    fullPage: true,
  });

  await browser.close();
  console.log('Screenshots saved to docs/');
})();
