import { scraper } from "./scraper/scraper";
import { removeFolder } from "./scraper/removeFolder";
import { config } from "../config/config";
import { linksLogger } from "./logger";

// remove the downloads folder before start the download process
removeFolder();

// Recibe los argumentos pasados al script
// el argumento[2] será algo como esto:
// '[{ day: "06", month: "09", year: "2024" },{ day: "07", month: "09", year: "2024" }]'
const args = process.argv.slice(2);
const param = args.find((arg) => arg.startsWith("--parameters="));

// Variables para guardar las fechas
let dateFrom;
let dateTo;

// Si se pasaron parámetros
if (param) {
  // Obtener el valor del parámetro
  const value = param.split("=")[1];
  if (value != "") {
    const dates = JSON.parse(value);
    console.log(dates);
    dateFrom = dates[0];
    dateTo = dates[1];
  } else {
    linksLogger.info("No parameters passed");
    console.log("No parameters passed");
  }
}

// Corre el scraper para "rg" y "mono"
// Esta funcion obtiene los archivos para "Traspasos rg/mono diario"
// y los guarda en la carpeta "downloads"
// Se puede pasar una fecha personalizada como tercer argumento y cuarto argumento
// e.g { day: "01", month: "01", year: "2021" }
(async () => {
  if (!dateFrom || !dateTo) {
    await scraper(0, config.PATH_RG);
    await scraper(1, config.PATH_MONO);
  } else {
    await scraper(0, config.PATH_RG, dateFrom, dateTo);
    await scraper(1, config.PATH_MONO, dateFrom, dateTo);
  }
})();
