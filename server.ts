const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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
}

async function run() {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.cheapflights.com/');
  await page.waitForSelector('//*[@id="popover"]/div/div[2]/div[1]/div[2]/div/input');
  const inputElement = await page.$x('//*[@id="popover"]/div/div[2]/div[1]/div[2]/div/input');
  await inputElement[0].type('New York');
      await page.type('#search-to', 'Los Angeles');

  // Select departure and return dates
  await page.click('#search-depart-input');
  await page.click('.day[data-date="2022-06-01"]');
  await page.click('.day[data-date="2022-06-15"]');

  // Submit the form
  await page.click('#submit');
  const flights = await page.evaluate(() => {
    const { document } = new JSDOM('').window;

    const results: Flight[] = [];

    document.querySelectorAll('.result .card-body').forEach((card: any) => {
      const flight: Flight = {};

      flight.airline = card.querySelector('.airline-name')?.textContent.trim();
      flight.price = parseFloat(card.querySelector('.price-text')?.textContent.replace(/\D/g, '') ?? '0');
      flight.departureTime = card.querySelector('.depart-time')?.textContent.trim();
      flight.departureAirport = card.querySelector('.depart-airport')?.textContent.trim();
      flight.arrivalTime = card.querySelector('.arrival-time')?.textContent.trim();
      flight.arrivalAirport = card.querySelector('.arrival-airport')?.textContent.trim();

      results.push(flight);
    });

    return results;
  });

  console.log(flights);

  await browser.close();
}

run();

app.listen(5000, () => {
  console.log('listening on port', 5000);
});
