// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import { promises as fs } from "fs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(req, res) {
  // Find the absolute path of the json directory
  // const jsonDirectory = path.join('/temp/s');
  //Read the json data file data.json
  // const site_info_location =
  //   process.env.DEV == "yes" ? path.join(process.cwd(),'temp','site-info.json') : "/temp/site-info.json";
  // const fileContents = await fs.readFile(
  //   site_info_location,
  //   "utf8"
  // );

  const data_site_arr = [];
  const site_info_collection = collection(db, "/site-info");
  try {
    const snapshot = await getDocs(site_info_collection);
    snapshot.docs.forEach((doc) => data_site_arr.push({ ...doc.data() }));
  } catch (err) {
    console.log(err);
  }
  
  // console.log(data_site_arr[0])
  //Return the content of the data file in json format
  res.status(200).json(data_site_arr[0]);
}
