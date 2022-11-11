import Router, { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../pages/admin/components/util/loading-screen";

const ShopForm = ({ productId,productName }) => {
  const router = useRouter();

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
              placeholder="خليل ياسر"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="0794086598"
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
              id="wilaya"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="[object Object]"> Adrar </option>
              <option value="[object Object]"> Chlef </option>
              <option value="[object Object]"> Laghouat </option>
              <option value="[object Object]"> Oum El Bouaghi </option>
              <option value="[object Object]"> Batna </option>
              <option value="[object Object]"> Béjaïa </option>
              <option value="[object Object]"> Biskra </option>
              <option value="[object Object]"> Béchar </option>
              <option value="[object Object]"> Blida </option>
              <option value="[object Object]"> Bouira </option>
              <option value="[object Object]"> Tamanrasset </option>
              <option value="[object Object]"> Tébessa </option>
              <option value="[object Object]"> Tlemcen </option>
              <option value="[object Object]"> Tiaret </option>
              <option value="[object Object]"> Tizi Ouzou </option>
              <option value="[object Object]"> Alger </option>
              <option value="[object Object]"> Djelfa </option>
              <option value="[object Object]"> Jijel </option>
              <option value="[object Object]"> Sétif </option>
              <option value="[object Object]"> Saida </option>
              <option value="[object Object]"> Skikda </option>
              <option value="[object Object]"> Sidi Bel Abbès </option>
              <option value="[object Object]"> Annaba </option>
              <option value="[object Object]"> Guelma </option>
              <option value="[object Object]"> Constantine </option>
              <option value="[object Object]"> Médéa </option>
              <option value="[object Object]"> Mostaganem </option>
              <option value="[object Object]"> {"M'Sila"} </option>
              <option value="[object Object]"> Mascara </option>
              <option value="[object Object]"> Ouargla </option>
              <option value="[object Object]"> Oran </option>
              <option value="[object Object]"> El Bayadh </option>
              <option value="[object Object]"> Bordj Bou Arreridj </option>
              <option value="[object Object]"> Boumerdès </option>
              <option value="[object Object]"> El Tarf </option>
              <option value="[object Object]"> Tindouf </option>
              <option value="[object Object]"> Tissemsilt </option>
              <option value="[object Object]"> El Oued </option>
              <option value="[object Object]"> Khenchela </option>
              <option value="[object Object]"> Souk-Ahras </option>
              <option value="[object Object]"> Tipaza </option>
              <option value="[object Object]"> Mila </option>
              <option value="[object Object]"> Aïn Defla </option>
              <option value="[object Object]"> Naâma </option>
              <option value="[object Object]"> Aïn Témouchent </option>
              <option value="[object Object]"> Ghardaia </option>
              <option value="[object Object]"> Relizane </option>
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
              placeholder="Your message..."
            ></textarea>
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
