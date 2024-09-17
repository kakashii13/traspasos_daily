import dotenv from "dotenv";

dotenv.config();

export const config = {
  // SSS CONFIG
  URL: process.env.URL || undefined,
  OS_USER: process.env.OS_USER || undefined,
  OS_PASSWORD: process.env.OS_PASSWORD || undefined,
  // LOGGER CONFIG
  FILE_LOGGER: process.env.FILE_LOGGER || "",
  DB_LOGGER: process.env.DB_LOGGER || "",
  // PATHS DOWNLOADS
  PATH_DOWNLOADS: process.env.PATH_DOWNLOADS || "",
  PATH_RG: process.env.PATH_RG || "",
  PATH_MONO: process.env.PATH_MONO || "",
  // PATH FILES
  PATH_RG_A: process.env.PATH_RG_A || "",
  PATH_RG_B: process.env.PATH_RG_B || "",
  PATH_MONO_A: process.env.PATH_MONO_A || "",
  PATH_MONO_B: process.env.PATH_MONO_B || "",
};
