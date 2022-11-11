import { db } from "../../../firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useRef, useState } from "react";
import LoadingScreen from "./util/loading-screen";

const AddProduct = () => {
  const [formLoading, setFormLoading] = useState(false);
  const titleRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef(0);
  const mainImgRef = useRef("");
  function submitForm() {
    setFormLoading(true);
    // get collection ref
    const productCollection = collection(db, "/products");

    // add new doc to collection
    addDoc(productCollection, {
      title: titleRef.current.value,
      price: priceRef.current.value,
      desc: descRef.current.value,
      img: mainImgRef.current,
    })
      .then((msg) => {
        setFormLoading(false);
        console.log(msg);
        alert("تم إضافة المنتج بنجاح");
      })
      .catch((err) => {
        setFormLoading(false);
        console.log(err);
        alert("حدث خطء أثناء إضافة المنتج حاول مرة اخرى او اتصل بالمبرمج");
      });
  }
  return (
    <div className="container ">
      {formLoading && <LoadingScreen />}

      {/* title price desc main_img imgs  */}
      <form onSubmit={submitForm}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="productTitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Product Title
            </label>
            <input
              ref={titleRef}
              type="text"
              id="productTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="عنوان المنتج هنا"
              required
            />
          </div>

          <div>
            <label
              htmlFor="productPrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Price (بدون وضع العملة)
            </label>
            <input
              ref={priceRef}
              type="number"
              id="productPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2000"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="mainImg"
            >
              Main image
            </label>
            <input
              onChange={(event) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  mainImgRef.current = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
              }}
              ref={mainImgRef}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="mainImg"
              type="file"
              required
            />
          </div>
          <div>
            <label
              htmlFor="productDesc"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Discription
            </label>
            <textarea
              required
              ref={descRef}
              id="productDesc"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="أضف وصف للمنتج هنا "
            ></textarea>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submitForm"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            حفظ المنتج
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
