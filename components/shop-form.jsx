import Router, { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../pages/admin/components/util/loading-screen";
import WILAYAS from "../const/wilayas";

const ShopForm = ({ productId, productName, setDeliveryPrice }) => {
  const router = useRouter();
  function changeDeliveryPrice(wilaya) {
    console.log(changeDeliveryPrice);
    if (wilaya == "oran") {
      setDeliveryPrice(300);
    }
    if (["tindouf", "Tamanrasset", "Illizi"].includes(wilaya)) {
      setDeliveryPrice(1100);
    }
    setDeliveryPrice("600 - 800");
  }

  const [formIsSendingData, setFormIsSendingData] = useState(false);
  async function sendInfo(e) {
    setFormIsSendingData(true);
    e.preventDefault();
    const { full_name, phone, wilaya, baladiya, other_info, quantity } =
      e.target;

    const options = {
      method: "POST",
      body: JSON.stringify({
        productName: productName,
        fullName: full_name.value,
        phone: phone.value,
        wilaya: wilaya.options[wilaya.selectedIndex].text,
        baladiya: baladiya.value,
        quantity: quantity.value,
        otherInfo: other_info.value,
        productId: productId,
      }),
    };
    try {
      const data = await (await fetch("/api/order_product", options)).json();
      setFormIsSendingData(false);
      router.push("/success");
    } catch (err) {
      console.log(err);
      alert("لقد حدث خطئ أثناء إرسال معلوماتك جرب مرة اخرى او اتصل بالصفحة");
    }
  }
  return (
    <div className="my-4">
      {formIsSendingData && (
        <LoadingScreen msg={"يتم معالجة طلبك يرجى الإنتظار"} />
      )}
      <form onSubmit={(e) => sendInfo(e)}>
        <h2 className="text-gray-400 mb-2 text-2xl font-medium">
          إملئ معلوماتك لتأكيد الطلب
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              الإسم الكامل*
            </label>
            <input
              type="text"
              id="full_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="الإسم و اللقب"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              رقم الهاتف*
            </label>
            <input
              type="tel"
              // pattern="^(00213|+213|0)(5|6|7)[0-9]{8}$"
              id="phone"
              className="bg-gray-50 border placeholder:text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="رقم الهاتف هنا"
              required
            />
          </div>

          <div>
            <label
              htmlFor="wilaya"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              إختر الولاية*
            </label>
            <select
              defaultValue={"Alger"}
              onChange={(e) =>
                changeDeliveryPrice(
                  e.target.options[e.target.selectedIndex].text
                )
              }
              id="wilaya"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {WILAYAS.map((wilaya, index) => (
                <option key={index} value={wilaya}>
                  {wilaya + " - " + (index + 1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="baladiya"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              بلدية*
            </label>
            <input
              type="text"
              id="baladiya"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="إسم البلدية"
              required
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              الكمية*
            </label>
            <input
              type="number"
              id="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="1"
              defaultValue={1}
              required
            />
          </div>

          <div>
            <label
              htmlFor="other_info"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              معلومات أخرى (إختياري)
            </label>
            <textarea
              id="other_info"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="معلومات أخرى عن الطلب تريد إضافتها"
            ></textarea>
          </div>
          <div>
            <h2 className="text-2xl font-bold underline">ملاحظة</h2>
            <p className="text-lg font-medium">ثمن التوصيل يحدد حسب الأتي:</p>
            <ul>
              <li>- تندوف تمنراست إليزي 1100دج</li>
              <li>- باقي ولايات الجنوب 800دج</li>
              <li>- ولاية وهران 300دج</li>
              <li>- باقي الولايات 600دج</li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-500 border-0 py-4 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            تأكيد الطلب
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
