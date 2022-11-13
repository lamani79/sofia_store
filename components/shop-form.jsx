import Router, { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../pages/admin/components/util/loading-screen";

const ShopForm = ({ productId, productName,setDeliveryPrice }) => {
  const router = useRouter();
  function changeDeliveryPrice(wilaya) {
    console.log(changeDeliveryPrice);
    if (wilaya == "oran") {
      setDeliveryPrice(300);
    }
    if (["tindouf", "Tamanrasset", "Illizi"].includes(wilaya)) {
      setDeliveryPrice(1100);
    }
    setDeliveryPrice('600 - 800');
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
            defaultValue={'Adrar'}
              onChange={(e) =>
                changeDeliveryPrice(
                  e.target.options[e.target.selectedIndex].text
                )
              }
              id="wilaya"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="0">--Wilaya--</option>
              <option value="Adrar">Adrar</option>
              <option value="Aïn Defla">Aïn Defla</option>
              <option value="Aïn Temouchent">Aïn Temouchent</option>
              <option value="Alger">Alger</option>
              <option value="Annaba">Annaba</option>
              <option value="Batna">Batna</option>
              <option value="Béchar">Béchar</option>
              <option value="Bejaia">Bejaia</option>
              <option value="BENI ABBES">BENI ABBES</option>
              <option value="Biskra">Biskra</option>
              <option value="Blida">Blida</option>
              <option value="BORDJ BADJI MOKHTAR">BORDJ BADJI MOKHTAR</option>
              <option value="Bordj Bou Arreridj">Bordj Bou Arreridj</option>
              <option value="Bouira">Bouira</option>
              <option value="Boumerdes">Boumerdes</option>
              <option value="Chlef">Chlef</option>
              <option value="Constantine">Constantine</option>
              <option value="DJANET">DJANET</option>
              <option value="Djelfa">Djelfa</option>
              <option value="El Bayadh">El Bayadh</option>
              <option value="EL MENIAA">EL MENIAA</option>
              <option value="El Oued">El Oued</option>
              <option value="El Tarf">El Tarf</option>
              <option value="Ghardaia">Ghardaia</option>
              <option value="Guelma">Guelma</option>
              <option value="Illizi">Illizi</option>
              <option value="IN GUEZZAM">IN GUEZZAM</option>
              <option value="IN SALAH">IN SALAH</option>
              <option value="Jijel">Jijel</option>
              <option value="Khenchela">Khenchela</option>
              <option value="Laghouat">Laghouat</option>
              <option value="M'GHAIR">{"M'GHAIR"}</option>
              <option value="Mascara">Mascara</option>
              <option value="Medea">Medea</option>
              <option value="Mila">Mila</option>
              <option value="Mostaganem">Mostaganem</option>
              <option value="MSila">MSila</option>
              <option value="Naama">Naama</option>
              <option value="Oran">Oran</option>
              <option value="Ouargla">Ouargla</option>
              <option value="OULED DJELLAL">OULED DJELLAL</option>
              <option value="Oum El Bouaghi">Oum El Bouaghi</option>
              <option value="Relizane">Relizane</option>
              <option value="Saïda">Saïda</option>
              <option value="Sétif">Sétif</option>
              <option value="Sidi Bel Abbes">Sidi Bel Abbes</option>
              <option value="Skikda">Skikda</option>
              <option value="Souk Ahras">Souk Ahras</option>
              <option value="Tamanrasset">Tamanrasset</option>
              <option value="Tébessa">Tébessa</option>
              <option value="Tiaret">Tiaret</option>
              <option value="TIMIMOUN">TIMIMOUN</option>
              <option value="Tindouf">Tindouf</option>
              <option value="Tipaza">Tipaza</option>
              <option value="Tissemsilt">Tissemsilt</option>
              <option value="Tizi Ouzou">Tizi Ouzou</option>
              <option value="Tlemcen">Tlemcen</option>
              <option value="TOUGGOURT">TOUGGOURT</option>
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
