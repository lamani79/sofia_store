// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import { promises as fs } from "fs";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
export const config = {
  api: {
    externalResolver: true,
  },
};
export default async function handler(req, res) {
  const newSiteInfo = JSON.parse(req.body);
  // Find the absolute path of the json directory
  // const jsonDirectory = path.join(process.cwd(), "json", "site-info.json");

  try {
    await setDoc(doc(db,'/site-info','GyI0P4iYURvVvHZixWAW'),newSiteInfo)
    // const promis = fs.writeFile(jsonDirectory, newSiteInfo);
    // await promis;
    res.status(200).json("done with updating the site info file");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error updating site info file");
  }
}
