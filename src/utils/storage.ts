import fs from "fs";
import path from "path";
import { RootPath } from "..";

export function createFolderIfNotExists(path: string) {
  if (fs.existsSync(path)) {
    return;
  }
  return fs.mkdirSync(path, { recursive: true });
}
export function createAsset(fileContent: string, filepath: string) {
  const folder = path.dirname(filepath);
  createFolderIfNotExists(folder);
  const buffer = Buffer.from(fileContent, "base64");
  return fs.writeFileSync(filepath, buffer);
}

export function createFile(fileContent: string, filepath: string) {
  const folder = path.dirname(filepath);
  createFolderIfNotExists(folder);
  const writer = fs.createWriteStream(filepath, { flags: "a" });
  writer.write(fileContent);
  // return fs.writeFileSync(filepath, fileContent, { flag: "a" });
}

export function storeOnLocalAsset(data: string, filePathName: string): string;
export function storeOnLocalAsset(
  data: string,
  filePath: string,
  fileName: string,
): string;
export function storeOnLocalAsset(
  data: string,
  filePath: string,
  fileName?: string,
): string {
  if (fileName) {
    filePath = path.join(filePath, fileName);
  }
  createAsset(data, filePath);
  const relativePath = path.relative(RootPath, filePath);
  return relativePath.replace(/\\/g, "/");
}
