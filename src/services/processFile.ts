import FileManager from "./fileManager";

function processFile(path: string, param1: number, param2: number) {
  const fileManager = new FileManager(path, param1, param2);
  fileManager.readFile();
  if (fileManager.existFile) {
    fileManager.parseFile();
    fileManager.parseToObject();
    fileManager.saveInDB();
  }
}

export default processFile;
