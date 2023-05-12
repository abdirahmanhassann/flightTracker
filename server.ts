      const puppeteer = require('puppeteer');
      const express = require('express');
      const app = express();
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom; 
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
      ticketBooking?:string
      }
      
    const destination1='copenhagen';
    const destination2='berlin';
      async function run() {
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
      
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const submitButton = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[2]/div/button');
      await submitButton[0].click();
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('before identifying');
      
      const flight = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[5]/ul');
      const flightss = await flight[0].$$('li');
      console.log('working so far....');
      
      const file=await fs.open('flightdata.txt','w');
      const stream = await file.createWriteStream();
      const arrayofflights:Flight[]=[]
      for (const i of flightss) {
        const textContent = await i.evaluate((node:any) => node.innerText);

        
        const textLines = textContent.split("\n");
        const match = textLines[6] ? textLines[6].match(/\d+\s+(hr|min)/g) : null;
        
        let flightObj :Flight = {
          departureTime:textLines[0],
          departureAirport:textLines[1],
          arrivalTime:textLines[2],
          arrivalAirport:textLines[3],
          ticketBooking:textLines[4],
          price:textLines[5],
          airline:match
        };

        arrayofflights.push(flightObj)
        const buffer = Buffer.from(textContent + '\n \n \n', 'utf-8');
   await stream.write(buffer);
        console.log(flightObj)
      }
//console.log(arrayofflights)

      stream.end();
           

            // Wait for search results to load
      await new Promise(resolve => setTimeout(resolve, 500000));
      const { document } = new JSDOM('').window;

      const flights = await page.evaluate(() => {
        const results: Flight[] = [];
    
        document.querySelectorAll('.gws-flights-results__itinerary-card-summary').forEach((card: any) => {
          const flight: Flight = {};
    
          const priceString = card.querySelector('.gws-flights-results__price')?.textContent.trim() ?? '';
          flight.price = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
    
          const departure = card.querySelector('.gws-flights-results__times')?.firstChild?.textContent.trim() ?? '';
          [flight.departureTime, flight.departureAirport] = departure.split(' from ');
    
          const arrival = card.querySelector('.gws-flights-results__times')?.lastChild?.textContent.trim() ?? '';
          [flight.arrivalTime, flight.arrivalAirport] = arrival.split(' to ');
    
          flight.airline = card.querySelector('.gws-flights-results__airline-name')?.textContent.trim();
    
          results.push(flight);
        });
    
        return results;
      });
    
      console.log(flights);
    
      await browser.close();
    }
    
    run();
    