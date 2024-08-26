import dotenv from "dotenv";

dotenv.config();

export const config = {
  PATH_DOWNLOADS: process.env.PATH_DOWNLOADS || "",
  URL: process.env.URL || undefined,
  OS_USER: process.env.OS_USER || undefined,
  OS_PASSWORD: process.env.OS_PASSWORD || undefined,
  FILE_LOGGER: process.env.FILE_LOGGER || "",
  PATH_RG: process.env.PATH_RG || "",
  PATH_MONO: process.env.PATH_MONO || "",
};
