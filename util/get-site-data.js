import path from "path";
import { promises as fs } from "fs";

const jsonDirectory = path.join(process.cwd(), "json");
//Read the json data file data.json
const fileContents = await fs.readFile(
  jsonDirectory + "/site-info.json",
  "utf8"
);

module.exports =  fileContents;
