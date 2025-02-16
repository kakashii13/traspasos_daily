import fs from "fs";
import papaparse from "papaparse";
import { getDate } from "../scraper/getDate";
import TraspasosDaily from "../model/traspasos_daily.model";
import parseDate from "./parseDate";
import { loggerFn } from "../logger";

class FileManager {
  path;
  existFile: any;
  file: any;
  txtData: any;
  dataObject: any;
  tipo_mov;
  regimen;

  constructor(path: string, tipo_mov: number, regimen: number) {
    this.path = path;
    this.dataObject = [];
    this.tipo_mov = tipo_mov;
    this.regimen = regimen;
  }

  readFile() {
    try {
      loggerFn.info("Init read file.");
      const file = fs.readFileSync(this.path, { encoding: "utf-8" });
      this.file = file;
      this.existFile = true;
      loggerFn.info("File read successfully.");
    } catch (error: any) {
      loggerFn.error("Error to read file.");
      this.existFile = false;
    }
  }
  parseFile() {
    try {
      loggerFn.info("Init parse file.");
      papaparse.parse(this.file, {
        header: false,
        complete: (results: any) => {
          this.txtData = results.data;
        },
      });
      loggerFn.info("File parsed successfully.");
      //   console.log(this.txtData);
    } catch (error) {
      loggerFn.error("Error to parse file.");
    }
  }

  // Convert each traspaso array in an object
  parseToObject() {
    try {
      loggerFn.info("Init parse file to object.");
      // get yesterday date
      const yDate = getDate();

      this.txtData.map((tr: any) => {
        if (tr[0] !== "") {
          if (this.regimen == 1) {
            // Complete with 0 if length of rnas is not 6
            if (tr[9].length != 6) tr[9] = tr[9].padStart(6, "0");

            this.dataObject.push({
              formulario: tr[0],
              cuil: tr[1],
              nombre_apellido: tr[2],
              vigencia: parseDate(tr[3]),
              fecha_confirmacion: `${yDate.year}-${yDate.month}-${yDate.day}`,
              telefono: tr[4],
              email: tr[5],
              cp: tr[6],
              localidad: tr[7],
              provincia_nombre: tr[8],
              obra_social_codigo: tr[9],
              tipo_movimiento_id: this.tipo_mov,
              gerenciador_codigo: null,
              regimen_id: this.regimen,
            });
          } else {
            // if is regimen monotributista, add tipo_mono beginning
            // Complete with 0 if length of rnas is not 6
            if (tr[10].length != 6) tr[10] = tr[10].padStart(6, "0");
            this.dataObject.push({
              tipo_monotributista: tr[0].trim(),
              formulario: tr[1],
              cuil: tr[2],
              nombre_apellido: tr[3],
              vigencia: parseDate(tr[4], true),
              fecha_confirmacion: `${yDate.year}-${yDate.month}-${yDate.day}`,
              telefono: tr[5],
              email: tr[6],
              cp: tr[7],
              localidad: tr[8],
              provincia_nombre: tr[9],
              obra_social_codigo: tr[10],
              tipo_movimiento_id: this.tipo_mov,
              gerenciador_codigo: null,
              regimen_id: this.regimen,
            });
          }
        }
      });

      loggerFn.info("File parsed successfully.");
      //   console.log(this.dataObject);
    } catch (error: any) {
      loggerFn.error("Error to parse file.");
      throw new Error(`Error to parse file data to object ${error?.message}`);
    }
  }

  async saveInDB() {
    try {
      loggerFn.info("Init saved in db.");
      await TraspasosDaily.bulkCreate(this.dataObject);
      loggerFn.info("Data saved successfully.");
    } catch (error) {
      loggerFn.error("Error to save data in db.");
      console.log(error);
      throw new Error("Error to save in db");
    }
  }
}

export default FileManager;
