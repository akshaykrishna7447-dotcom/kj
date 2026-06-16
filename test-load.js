import puppeteer from 'puppeteer';
import { createServer, preview } from 'vite';

(async () => {
    // Start preview server
    const server = await preview({
        preview: { port: 4173 },
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    console.log('Navigating to http://localhost:4173...');
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

    console.log('Waiting 10s for preloader to finish...');
    await new Promise(r => setTimeout(r, 10000));

    console.log('Page loaded. Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
    server.httpServer.close();
    console.log('Done.');
})();
