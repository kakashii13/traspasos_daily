import { createLogger, format, transports } from "winston";
import { config } from "../config/config";

const linksLog = config.FILE_LOGGER;

// Create a logger for the download links
// this logger will store the number of registers to download
export const linksLogger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: linksLog,
    }),
    new transports.Console(),
  ],
});
