const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require('fs');
const {
    compile
} = require('html-to-text');

const convert = compile({
    wordwrap: 130
});

puppeteer.use(StealthPlugin());



const konfigbrowser = {
    headless: false,
    viewport: {
        width: 0,
        height: 0
    },
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: [
        "--log-level=3", // fatal only

        "--no-default-browser-check",
        "--disable-infobars",
        "--disable-web-security",
        "--disable-site-isolation-trials",
        "--no-experiments",
        "--ignore-gpu-blacklist",
        "--ignore-certificate-errors",
        "--ignore-certificate-errors-spki-list",
        "--mute-audio",
        "--disable-extensions",
        "--no-sandbox",
    ],
    disablejavascript: true,
    ignoreHTTPSErrors: true,
    incognito: true,
    disablegpu: true,


};
async function getSettlement(user, pass, tglawal, blnawal, tglakhir, blnakhir) {
    const browser = await puppeteer.launch(konfigbrowser);
    const page = await browser.newPage();
    var norek = "1330016788440";
    try {

        await page.goto('https://ibank.bankmandiri.co.id/retail3/loginfo/loginRequest', {
            waitUntil: 'networkidle2'
        });



        await page.type("#userid_sebenarnya", "uuu", { delay: 100 });
        await page.type("#pwd_sebenarnya", "uuuu", { delay: 100 });
        await page.click("#btnSubmit");


        await page.waitForNavigation({
            waitUntil: 'networkidle2',

        });


        let url;




        await page.click("div.acc-left")
        await page.waitForSelector("#globalTable > tbody > tr:nth-child(1) > td.desc > div");
        const result = await page.$$eval('#globalTable > tbody > tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });
        let arrayfilter = []
        for (let i = 0; i < result.length; i++) {
            const filtered = result[i].filter(function (el) {
                return el != "-";
            });
            if (filtered.length > 0) {
                console.log(filtered);
                arrayfilter.push(filtered);
            }
        }
        console.log(arrayfilter);
        await page.goto("https://ibank.bankmandiri.co.id/retail3/loginfo/logout")



    } catch (error) {

        console.log(error);
        await page.goto("https://ibank.bankmandiri.co.id/retail3/loginfo/logout")

    }
};
getSettlement().then(data => {
});
