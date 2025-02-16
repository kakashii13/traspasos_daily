import { scraper } from "./scraper/scraper";
import { removeFolder } from "./scraper/removeFolder";
import { config } from "./config/config";
import sequelize from "./config/db";
import processFile from "./services/processFile";

try {
  sequelize.authenticate();
  console.log("Connection has been stablished successfully.");
} catch (error) {
  console.log(error);
}

// // remove the downloads folder before start the download process
removeFolder();

// Run scraper for "rg" y "mono"
// This function get data of "Traspasos rg/mono diario"
// and save in "downloads" folder
(async () => {
  await scraper(0, config.PATH_RG);
  await scraper(1, config.PATH_MONO);

  // Params are path of file, tipo_mov (A,B), regimen (1: gr, 2, mono)
  processFile(config.PATH_RG_A, 1, 1);
  processFile(config.PATH_RG_B, 2, 1);
  processFile(config.PATH_MONO_A, 1, 2);
  processFile(config.PATH_MONO_B, 2, 2);
})();
