
/// <reference types="node" />
/// <reference types="puppeteer" />

const puppeteer = require('puppeteer');

const fs=require('fs/promises')

interface Flight {
origin?: string;
destination?: string;
departureTime?: Date;
departureAirport?: string;
arrivalTime?: Date;
arrivalAirport?: string;
returnDate?: Date;
price?: number;
airline?: string;
flightNumber?:number;
ticketBooking?:string;
duration?:string
}

async function run(destination1:string,destination2:string) {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();
await page.goto('https://www.google.com/travel/flights');

// Close popup if it appears
const closeButton = await page.$('button[aria-label="Close"]');
if (closeButton) {
  await closeButton.click();
}


// Fill in origin and destination
await new Promise(resolve => setTimeout(resolve, 2000));

const input = await page.$x('//*[@id="i15"]/div[1]/div/div/div[1]/div/div/input');
await input[0].click();
await page.keyboard.press('End'); // move cursor to the end of the input
await page.keyboard.down('Shift'); // hold shift key
for (let i = 0; i < 20; i++) { // delete characters
    await page.keyboard.press('Backspace');
}
await page.keyboard.up('Shift'); // release shift key
await page.keyboard.type(destination1)
await page.keyboard.press('ArrowRight')
await page.keyboard.press('Enter')    

const input2= await page.$x('//*[@id="i15"]/div[4]/div/div/div[1]/div/div/input')

await input2[0].click();
await page.keyboard.press('End'); // move cursor to the end of the input
await page.keyboard.down('Shift'); // hold shift key
for (let i = 0; i < 20; i++) { // delete characters
    await page.keyboard.press('Backspace');
}
await page.keyboard.up('Shift'); // release shift key
await page.keyboard.type(destination2)
await page.keyboard.press('ArrowRight')
await page.keyboard.press('Enter')    
await page.$eval('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div:nth-child(2) > c-wiz > div.cKvRXe > c-wiz > div.vg4Z0e > div:nth-child(1) > div.SS6Dqf.POQx1c > div.AJxgH > div > div.rIZzse > div.bgJkKe.K0Tsu > div > div > div.cQnuXe.k0gFV > div > div > div:nth-child(1) > div > div.oSuIZ.YICvqf.kStSsc.ieVaIb > div > input',
(el:any, value:any) => el.value = value, '25/07/2023')
await page.$eval('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div:nth-child(2) > c-wiz > div.cKvRXe > c-wiz > div.vg4Z0e > div:nth-child(1) > div.SS6Dqf.POQx1c > div.AJxgH > div > div.rIZzse > div.bgJkKe.K0Tsu > div > div > div.cQnuXe.k0gFV > div > div > div:nth-child(1) > div > div.oSuIZ.YICvqf.lJODHb.qXDC9e > div > input',
(el:any, value:any) => el.value = value, '25/10/2023')

// Submit the form 


await new Promise(resolve => setTimeout(resolve, 1000));

const submitButton = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[2]/div/button');
await submitButton[0].click();

await new Promise(resolve => setTimeout(resolve, 2000));
console.log('before identifying');

const flight = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[5]/ul');
const flightss = await flight[0].$$('li');
console.log('evaluate method is about to run') 
// await page.evaluate(async() => {
//     console.log('evaluate method is running')
//     const scrollButton:any = document.evaluate('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[5]/ul/li[19]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     if (await scrollButton) {
//         console.log('scrollbutton1',await scrollButton)
//         await  scrollButton.scrollIntoView();
//         console.log('scrollbutton2',await scrollButton)
//     await new Promise(resolve => setTimeout(resolve, 2000));
//       await scrollButton.click()
      
//     }
//     else {
//         console.log('no scrollbutton found')
//         return null
//     }
//   });
 //const scrollButton = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[5]/ul/li');
 await flightss[21].scrollIntoView()
 await new Promise(resolve => setTimeout(resolve, 1000));
 await flightss[21].click() 
  await page.waitForNavigation();
        console.log('working so far....');
const file=await fs.open('flightdata.txt','w');
const stream = await file.createWriteStream();
const arrayofflights:Flight[]=[]

for (const i of flightss) {
  const textContent = await i.evaluate((node:any) => node.innerText);
const textLines = textContent.split("\n");

///   const durationRegex = /(\d+)\s*(hr|min)\s*([\w\s]+?)(?=\d|$)/g;

let airline ;
let duration ;
let price;
let booking
console.log(textLines[6])
if(textLines[6] && textLines[6].includes('min'))
{
airline=textLines[6].substring(textLines[6].indexOf('min') + 3);

}
else if(textLines[6] && textLines[6].includes('hr')){
airline=textLines[6].substring(textLines[6].indexOf('hr') + 2);

}

if(textLines[5]&& textLines[5].includes('TRY')){
price=textLines[5]
booking=textLines[4]
price=price.substring(price.indexOf('TRY')+4).replace(',','')
price=Number(price)
}
else if(textLines[4]&& textLines[4].includes('TRY')){
price=textLines[4]
booking=textLines[5]

price=price.substring(price.indexOf('TRY')+4).replace(',','')
price=Number(price)
}

  let flightObj :Flight = {
    departureTime:textLines[0],
    departureAirport:textLines[1],
    arrivalTime:textLines[2],
    arrivalAirport:textLines[3],
    ticketBooking:booking,
    price:price,
    airline:airline
  }


  arrayofflights.push(flightObj)
  const buffer = Buffer.from(textLines + '\n \n \n', 'utf-8');
  await stream.write(buffer)
  
  console.log(flightObj)
  
}

//console.log(arrayofflights)

stream.end();
    file.close();

await browser.close();
}

module.exports=run;

