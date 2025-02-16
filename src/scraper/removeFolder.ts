import fs from "fs";
import { config } from "../config/config";

/* 
    This function is used to remove download folder before start the download process
    this assures that we have a clean folder to store the files
*/

export const removeFolder = () => {
  if (fs.existsSync(config.PATH_DOWNLOADS)) {
    fs.rmSync(config.PATH_DOWNLOADS, { recursive: true, force: true });
    console.log("Folder removed");
  }
};
