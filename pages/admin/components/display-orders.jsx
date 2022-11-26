import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import OrderCard from "./order-card";
import LoadingScreen from "./util/loading-screen";

const DisplayOrders = () => {
  const order_collection = collection(db, "/orders");
  function getOrders() {
    // colleciton ref:
    // get data from collection
    getDocs(order_collection)
      .then((snapShot) => {
        const data_arr = [];
        snapShot.docs.forEach((doc) =>
          data_arr.push({ id: doc.id, ...doc.data() })
        );
        setOrdersData(data_arr);
        setSortedOrders(data_arr.sort((a, b) => b.date - a.date));
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }
  async function removeOrder(order_id) {
    setisLoading(true);
    try {
      await deleteDoc(doc(db, "/orders", order_id));
      document.getElementById(order_id).remove();
    } catch (err) {
      console.log(err);
      alert("حدث مشكل أثناء محاولة حذف الطلبية");
    }
    setisLoading(false);
  }
  const [isLoading, setisLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [orderCardStatus, setOrderCardStatus] = useState(false);
  const [orderCardInfo, setOrderCardInfo] = useState(null);
  const [sortedOrders, setSortedOrders] = useState([]);

  function displayCardInfo(info) {
    setOrderCardInfo(() => info);
    setOrderCardStatus(() => true);
    console.log(info);
  }
  function closeOrderCard() {
    setOrderCardStatus(false);
  }
  async function changeOrderStatus(id, new_status) {
    setisLoading(() => true);
    try {
      await updateDoc(doc(db, "/orders", id), {
        status: new_status,
      });
      setisLoading(() => false);
    } catch (errs) {
      console.log(errs);
    }
  }
  function getLastOrdersFirst() {
    // console.log(sortedOrders)
    console.log()
    setSortedOrders((o) => {
      return o.sort((a, b) => a.date - b.date);
      
    });
  }
 
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="">
      {isLoading && <LoadingScreen />}
      {orderCardStatus && (
        <OrderCard closeCard={() => closeOrderCard()} info={orderCardInfo} />
      )}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table
          id="order_table"
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                index
              </th>
              <th scope="col" className="py-3 px-6">
                إسم المنتج
              </th>
              <th scope="col" className="py-3 px-6">
                تاريخ الطلبية
              </th>
              <th scope="col" className="py-3 px-6">
                معرف الطلبية
              </th>
              <th scope="col" className="py-3 px-6">
                إسم العميل
              </th>
              <th scope="col" className="py-3 px-6">
                حالة الطلبية
              </th>

              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {
              //  ordersData
              sortedOrders.map((order, index) => {
                const order_date = order?.date
                  .toDate()
                  .toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                return (
                  <tr
                    id={order.id}
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th className="py-4 px-6" scope="row">
                      {index + 1}
                    </th>

                    <td className="max-w-[200px] overflow-x-scroll py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.productName}
                    </td>
                    <td className="py-4 px-6">{order_date}</td>
                    <td className="py-4 px-6">{order.productId}</td>
                    <td className="py-4 px-6">{order.fullName}</td>
                    <td className="py-4 px-6">
                      <select
                        onChange={(e) =>
                          changeOrderStatus(
                            order.id,
                            e.target.options[e.target.selectedIndex].value
                          )
                        }
                        defaultValue={order.status}
                        id="order_status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={"قيد المراجعة"}>قيد المراجعة</option>
                        <option value="تمت المراجعة">تمت المراجعة</option>
                        <option value="تم إرسال">تم إرسال</option>
                        <option value="تم الوصول">تم الوصول</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 flex flex-col">
                      {/* <button
                      
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        تعديل
                      </button> */}
                      <button
                        onClick={() => displayCardInfo(order)}
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        مشاهدة
                      </button>
                      <button
                        onClick={() => getLastOrdersFirst()}
                        // onClick={(e) => removeOrder(order.id, index, e)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })
              // ordersData.map(order => <div key={order.id}>{order.fullName}</div>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayOrders;
