import puppeteer from "puppeteer";

export default async function webScraping(req, res) {

    console.log('node')
    console.log(req.body.divisas)

    const browser = await puppeteer.launch({
        headless: 'new',
    });

    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://google.com/')

    const search = await page.waitForSelector('#APjFqb')


    await search.type(`exchange divisas`)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    await page.click('[class="M2vV3 vOY7J"]')


    const obj = await req.body.divisas.reduce(async (previousPromise, i) => {
      try  {
          let acc = await previousPromise;
            const search2 = await page.waitForSelector('#APjFqb')
            await search2.type(`USD to ${i}`)
            await page.keyboard.press('Enter')
            await page.waitForNavigation()
            const value = await page.evaluate(() => document.querySelector('.SwHCTb').innerText)
            console.log(value)
            await page.click('[class="M2vV3 vOY7J"]')

            return {...acc, [i]: value}
      } catch (error) {
        console.log(error)
        return {}
      }

          

       


    }, Promise.resolve({}));


    console.log(obj)

     return res.json(obj)




    //     req.body.divisas.reduce(async (promise, i) => {
    //         await promise
    //         await page.click('[class="M2vV3 vOY7J"]')
    //         const search2 = await page.waitForSelector('#APjFqb')
    //         await search2.type(`USD to ${i}`)
    //         await page.keyboard.press('Enter')
    // return {...acc, i}

    //     }, Promise.resolve({}))



    // const value = await page.evaluate(() => {
    //     const value = document.querySelector('.SwHCTb').innerText
    //     return value
    // }
    // );
    // console.log(value)
    // await browser.close()

    // return res.json({exchange: value})

    // await page.focus('#APjFqb')
    // await page.keyboard.press('End')
    // await page.keyboard.press('Backspace')


}



















// import puppeteer from "puppeteer";

// export default async function webScraping(req, res) {

// console.log('node')
// console.log(req.body.divisas)

// const browser = await puppeteer.launch({
//     headless: 'new',
// });

// const page = await browser.newPage()
// await page.setDefaultNavigationTimeout(0);

// await page.goto('https://google.com/')

// const search = await page.waitForSelector('#APjFqb')


// await search.type(`1 ${req.body.input} to ${req.body.output}`)
// await page.keyboard.press('Enter')

// await page.waitForNavigation()
// const value = await page.evaluate(() => {
//     const value = document.querySelector('.SwHCTb').innerText
//     return value
// }
// );
// console.log(value)
// await browser.close()

// return res.json({exchange: value})




// }
