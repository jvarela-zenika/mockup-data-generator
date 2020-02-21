const puppeteer = require('puppeteer');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

(async () => {

    for (var i = 0; i < 1000; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const fileName = uuidv4();
        let structure = '';
        await page.on('console', msg => msg.text().includes('generated-page: ', 0) ? structure = msg.text().replace('generated-page: ', '') : '');
        await page.goto('http://localhost:3000');
        await page.screenshot({path: 'data/' + fileName + '.png'});

        fs.writeFile('data/' + fileName + '.gui', structure, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved! "+i);
        });
        await browser.close();
    }


})();