import { scraper } from "./scraper";
import { removeFolder } from "./removeFolder";
import { config } from "../config/config";

// remove the downloads folder before start the download process
removeFolder();

// Run the scraper for both "rg" and "mono"
// this function get the files for "Traspasos rg/mono diario"
// and save them in the "downloads" folder
// if you want to give a custom date, you can pass it as a third argument like an object
// e.g { day: "01", month: "01", year: "2021" }
(async () => {
  await scraper(0, config.PATH_RG);
  await scraper(1, config.PATH_MONO);
})();
