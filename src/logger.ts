import { createLogger, format, transports } from "winston";
import { config } from "./config/config";

const logs = config.FILE_LOGGER;

// Logger para guardar el número de registros a descargar
export const loggerFn = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: logs,
    }),
    new transports.Console(),
  ],
});
