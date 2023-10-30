import puppeteer from "puppeteer-core";
import NextCors from 'nextjs-cors';

// import chromium from "chrome-aws-lambda"
export default async function webScraping(req, res) {

    console.log('node')
    console.log(req.body.divisas)





    if (req.method === "POST") {

        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=3f0d97ad-6529-41ea-8431-2b631bfc983d`,
        })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://google.com/')
        const search = await page.waitForSelector('#APjFqb')
        await search.type(`exchange divisas`)
        await page.keyboard.press('Enter')
        await page.waitForNavigation()
        await page.click('[class="M2vV3 vOY7J"]')

        const obj = await req.body.divisas.reduce(async (previousPromise, i) => {
            try {
                let acc = await previousPromise;
                const search2 = await page.waitForSelector('#APjFqb')
                await search2.type(`USD to ${i}`)
                await page.keyboard.press('Enter')
                await page.waitForNavigation()
                const value = await page.evaluate(() => document.querySelector('.SwHCTb').innerText)
                console.log(value)
                await page.click('[class="M2vV3 vOY7J"]')

                return { ...acc, [i]: value }
            } catch (error) {
                console.log(error)
                return {}
            }

        }, Promise.resolve({}));


        await NextCors(req, res, {
            // Options
            methods: ['GET',  'POST',],
            origin: '*',
            optionsSuccessStatus: 200,
        });


        return res.json(obj)


    }






}

