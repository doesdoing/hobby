const puppeteer = require('puppeteer');
const cmd = require('./component-promise-shell');
const fs = require('fs');
module.exports = async function (json) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0;Win64;x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    await page.goto(json.web);
    const dimensions = await page.evaluate(function () {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });
    await console.log('Dimensions:', dimensions);
    await page.waitFor(3 * 1000);
    await page.screenshot({
        path: '/opt/node/word/png/' + json.sys + '_web.png'
    });
    if (json.login) {
        if (json.code) {
            let form = await page.$(json.code);
            await form.screenshot({
                path: '/opt/node/word/png/' + json.sys + 'code.png',
            });
            await cmd(json.shell);
        };
        await page.type(json.ID, json.admin, {
            delay: 100
        });
        await page.type(json.PD, json.pass, {
            delay: 100
        });
        if (json.shell) {
            let data = await fs.readFileSync('/opt/node/word/png/' + json.sys + 'code.txt', 'utf-8');
            await console.log(data);
            await page.type(json.incode, data, {
                delay: 100
            });
        }
        if (json.check) {
            await page.click(json.check);
        } else {
            await page.keyboard.press("Enter", {
                delay: 100
            });
        }
        await page.waitFor(2000);
        if (json.other) {
            await page.goto(json.other);
        }
        await page.waitFor(2000);
        await page.screenshot({
            path: '/opt/node/word/png/' + json.sys + '_login.png'
        });
    }
    console.log('system successful screenshot');
    await browser.close();
}