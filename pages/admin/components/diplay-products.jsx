import { db } from "../../../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoadingScreen from "./util/loading-screen";
import UpdateProduct from "./update-product";

const DisplayProducts = () => {
  const [idSelectedProduct, setIdSelectedProduct] = useState(null);
  const [updateProductScreen, setUpdateProductScreen] = useState(false);
  const productCollection = collection(db, "/products");
  function updateProduct(id_product) {
    setUpdateProductScreen(true);
    setIdSelectedProduct(id_product);
  }
  function deleteProduct(id_product) {
    setisLoading(true);
    deleteDoc(doc(db, "/products", id_product))
      .then(() => {
        document.getElementById(id_product).remove();
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function getProducts() {
    // colleciton ref:
    // get data from collection
    getDocs(productCollection)
      .then((snapShot) => {
        const data_arr = [];
        snapShot.docs.forEach((doc) =>
          data_arr.push({ id: doc.id, ...doc.data() })
        );
        setProductData(data_arr);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }
  const [isLoading, setisLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {updateProductScreen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99] grid place-content-center bg-black/90">
          <div className="bg-gray-100 dark:bg-gray-800 w-screen h-screen pt-4">
            <UpdateProduct productId={idSelectedProduct} />
          </div>
        </div>
      )}
      {isLoading && <LoadingScreen />}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="table-fixed min-w-full divide-y divide-gray-400">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase"
              >
                إسم المنتج
              </th>

              {/* <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase"
              >
                id
              </th> */}
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase"
              >
                سعر المنتج
              </th>
              <th
                scope="col"
                className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-600 divide-y divide-gray-200 dark:divide-gray-500">
            {productData.map((product, index) => {
              return (
                <tr
                  key={product.id}
                  id={product.id}
                  className="hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <td className="p-4  whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-200">
                    <div className="max-w-[300px ] overflow-x-scroll">
                      {product.title}
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-gray-200">
                    {product.price + "دج"}
                  </td>
                  <td className="p-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => updateProduct(product.id)}
                      type="button"
                      data-modal-toggle="product-modal"
                      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      تعديل
                    </button>
                    <button
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                      type="button"
                      data-modal-toggle="delete-product-modal"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayProducts;
