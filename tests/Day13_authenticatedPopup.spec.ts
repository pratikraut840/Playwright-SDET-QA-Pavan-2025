import {test, expect, Browser, BrowserContext, Page, chromium} from '@playwright/test';
/*
How to handle the authenticated windows?
1.	Navigate to https://the-internet-herokuapp.com/
There are 2 ways to pass the credentials into the app
2.	Directly pass credentials into the URL
1.	Page.goto(‘username:password@https//the-internet-herokuapp.com/basic_auth’)
3.	Directly pass Credentials while creating context
o	const context = await browser.newContext({
o	httpCredentials:{
o	username:'admin',
o	password:'admin'}
o	});
*/

test('Verify authenticated popups by directly into URL ', async ({page})=>{
    await page.goto('admin:admin@https://the-internet.herokuapp.com/basic_auth');
    const authText = page.getByText('Congratulations! You must have the proper credentials.', { exact: true }).textContent();
    expect(authText).toContain('Congratulations! You must have the proper credentials.');
})

test('Verify authenticated popups using browserContext', async ()=>{
        // Create a new browser instance using Chromium
        const browser: Browser = await chromium.launch();
    
        // Create a new isolated browser context
        const browserContext: BrowserContext = await browser.newContext({httpCredentials:{username:"admin",password:"admin"}});

        const page: Page = await browserContext.newPage();

    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    const authText = page.getByText('Congratulations! You must have the proper credentials.', { exact: true }).textContent();
    expect(authText).toContain('Congratulations! You must have the proper credentials.');


})