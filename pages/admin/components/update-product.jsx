import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import AddProduct from "./add-product";

const UpdateProduct = ({ productId }) => {
  const [productData, setProudctData] = useState(null);
  async function getProductInfo() {
    const docRef = doc(db, "products", productId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProudctData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      alert("No such document!");
    }
  }
  useEffect(() => {
    getProductInfo();
  }, []);
  return (
    <div>
      <AddProduct productData={{ id: productId, ...productData }} />
    </div>
  );
};

export default UpdateProduct;
