
/// <reference types="node" />
/// <reference types="puppeteer" />

import { pathToFileURL } from "url";

const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer");
 require('dotenv').config()

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
duration?:string;
email?:string;
}

 class Run {

  async returnFlight(destination1:string,destination2:string,budget:number,email:string,type:string){
    const d=destination1;
    const f=destination2;
    const y=budget;
    const e=email;
    const t=type
    let count=0;
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://www.google.com/travel/flights');
    try
{
  
const closeButton = await page.$('button[aria-label="Close"]');
if (closeButton) {
  await closeButton.click();
}


const dropdownn=await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[1]/div/div[1]/div[1]')
await dropdownn[0].click();
await new Promise(resolve => setTimeout(resolve, 2000));
  if(type==='Returning'){
    const returning=await page.$x('//*[@id="ow32"]/div[2]/div[2]/ul/li[1]');
await returning[0].click()
}
else if(type==='One way'){
    const returning=await page.$x('//*[@id="ow32"]/div[2]/div[2]/ul/li[2]');
    await returning[0].click()
    
  }
  else{
    const returning=await page.$x('//*[@id="ow32"]/div[2]/div[2]/ul/li[3]');
    await returning[0].click()
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
const input = await page.$x('//*[@id="i15"]/div[1]/div/div/div[1]/div/div/input');
await input[0].click();
await page.keyboard.press('End');
await page.keyboard.down('Shift');
for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Backspace');
  }

  await page.keyboard.up('Shift');
await page.keyboard.type(destination1)
await page.keyboard.press('ArrowRight')
await page.keyboard.press('Enter')    

const input2= await page.$x('//*[@id="i15"]/div[4]/div/div/div[1]/div/div/input')

await input2[0].click();
await page.keyboard.press('End');
await page.keyboard.down('Shift');
for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Backspace');
}
await page.keyboard.up('Shift');
await page.keyboard.type(destination2)
await page.keyboard.press('ArrowRight')
await page.keyboard.press('Enter')    
await page.$eval('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div:nth-child(2) > c-wiz > div.cKvRXe > c-wiz > div.vg4Z0e > div:nth-child(1) > div.SS6Dqf.POQx1c > div.AJxgH > div > div.rIZzse > div.bgJkKe.K0Tsu > div > div > div.cQnuXe.k0gFV > div > div > div:nth-child(1) > div > div.oSuIZ.YICvqf.kStSsc.ieVaIb > div > input',
(el:any, value:any) => el.value = value, '25/07/2023')
await page.$eval('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div:nth-child(2) > c-wiz > div.cKvRXe > c-wiz > div.vg4Z0e > div:nth-child(1) > div.SS6Dqf.POQx1c > div.AJxgH > div > div.rIZzse > div.bgJkKe.K0Tsu > div > div > div.cQnuXe.k0gFV > div > div > div:nth-child(1) > div > div.oSuIZ.YICvqf.lJODHb.qXDC9e > div > input',
(el:any, value:any) => el.value = value, '25/10/2023')
await new Promise(resolve => setTimeout(resolve, 1000));

const submitButton = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[2]/div/button');
await submitButton[0].click();

await new Promise(resolve => setTimeout(resolve, 2000));
console.log('before identifying');

const flight = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[3]/ul');
                            
const flightss = await flight[0].$$('li');
console.log('evaluate method is about to run') 

        console.log('working so far....');
const file=await fs.open('flightdata.txt','w');
const stream = await file.createWriteStream();
const arrayofflights:Flight[] |undefined=[]

for (const i of flightss) {
  const textContent = await i.evaluate((node:any) => node.innerText);
const textLines = textContent.split("\n");

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


  if(arrayofflights[0].price && arrayofflights[0].price<budget){
    await flightss[0].click()
    await new Promise(resolve => setTimeout(resolve, 3000));

     const po= await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[3]/ul/li[1]')
    await po[0].click()
    const   urll=await page.url()
      console.log('path not found')
      console.log(urll)

      let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true, 
    auth: {
      user: process.env.email, 
      pass: process.env.pass, 

    },
    tls: {
      rejectUnauthorized: false,
    },
  });
   await transporter.sendMail({
    from: process.env.email,
    to:email,
    subject: "Flight found",
    html: `
    <h1>A flight under ${budget} from ${destination1} to ${destination2} found!</h1>
    <p>${urll}</p>
    `,
  });
console.log('email has been sent');
  }
  
  stream.end();
  file.close();
  await browser.close();
  
  return arrayofflights;
  }
}
catch(e){
  console.log(e)
  await browser.close()
}
}}

module.exports=Run;

