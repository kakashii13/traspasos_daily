import puppeteer from "puppeteer";
import { getDate } from "./getDate";
import { linksLogger } from "./logger";
import { config } from "../config/config";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const scraper = async (
  ulIndex: number,
  path: string,
  customDate?: { day: string; month: string; year: string }
) => {
  linksLogger.info("Starting scraper");

  // #region Puppeteer setup
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
    ],
  });

  const page = await browser.newPage();

  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: path,
  });

  // #endregion

  //#region Environment variables
  const URL = config.URL;
  const user = config.OS_USER;
  const password = config.OS_PASSWORD;

  if (!URL || !user || !password)
    throw new Error("Missing environment variables");
  // #endregion

  try {
    await page.goto(URL);

    // login form
    await page.type('input[name="_user_name_"]', user);
    await page.type('input[name="_pass_word_"]', password);
    // submit form
    await page.click('input[name="submitbtn"]');

    await page.waitForSelector(".panel.panel-default");

    // wait for the panel to load
    const panel = await page.$(".panel.panel-default");

    if (!panel) throw new Error("Panel not found");

    // Extract all <ul> elements
    const uls = await panel.$$(".panel-body > ul");

    // access to the <ul> element at the specified index given as a parameter
    const ul = uls[ulIndex];

    // Click the first <li> in the current <ul>
    const firstLi = await ul.$("li");
    if (firstLi) {
      // this <li> contain the link to "Traspasos rg/mono diario"
      await firstLi.click();
      await page.waitForNavigation(); // Wait for navigation to complete after clicking
    }

    // Wait for the date input fields to be available
    await page.waitForSelector("#fechadesde");

    // Get the custom date or the yesterday date
    const { day, month, year } = customDate || getDate();

    // Type dates into input fields
    // e.g 01/01/2021 - 01/01/2021
    await page.type('input[name="fechadesde"]', `${day}/${month}/${year}`);
    await page.type('input[name="fechahasta"]', `${day}/${month}/${year}`);

    // Click the submit button
    // after this click will be see the results of "Altas y Bajas"
    await page.click('input[name="B1"]');
    // await page.waitForNavigation(); // Wait for navigation to complete after clicking

    // Wait for the results to load
    const table = await page.waitForSelector(
      ".table.table-responsive.table-striped"
    );

    /*
      Altas y bajas looks like this
      -----------------+------------------
      Altas            |      Bajas
      -----------------|------------------
      10 - Descargar   |    5 - Descargar
      -----------------+------------------

      we need to downloads the files, which are the second <a> "Descargar"
      there could not be values to download, so we skipped the download
    */

    let response;
    if (table) {
      response = await page.evaluate(() => {
        // here we will store the number of registers to download
        // of altas and bajas
        const response: any = [];

        // get all <td> elements
        // inside each <td> we have two <a> elements
        // we need to click the second <a> element
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
          // get all <a> elements
          const links = td.querySelectorAll("a");
          // if we have more than one <a> element
          // click the second one
          if (links.length > 1) {
            response.push(links[0].textContent);
            if (links[0].textContent == "0") return;
            links[1].click();
          }
        }
        return response;
      });
    } else console.log("Table not found");

    // log the number of registers to download
    linksLogger.info(
      `Count registers to download (${!ulIndex ? "RG" : "MONO"}) - Altas: ${
        response[0] ?? 0
      } - Bajas: ${response[1] ?? 0}`
    );

    // wait for the download to complete
    await delay(8000);
  } catch (error) {
    linksLogger.info(`Error`);
    console.log("Error: ", error);
  }

  await browser.close();
  linksLogger.info("Scraper finished");
};
