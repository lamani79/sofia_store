import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;
  const order_data = {
    ...JSON.parse(req.body),
    date: Timestamp.fromDate(new Date()),
    status: "new order",
  };

  const order_collection = collection(db, "/orders");
  try {
    await addDoc(order_collection, order_data);
    res.status(200).json({ msg: "document created" });
  } catch (err) {
  
    res.status(400).json({ err });
  }
}
