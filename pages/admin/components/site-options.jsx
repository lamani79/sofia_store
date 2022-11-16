import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import LoadingScreen from "./util/loading-screen";

const SiteOptions = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({});
  async function getSiteInfo() {
    const json_data = await (await fetch("/api/get-site-info")).json();
    console.log(json_data);
    setData(() => json_data);
    setIsLoading(false)
  }
  async function submitForm(e) {
    setIsLoading(true);
    const { title, description, about, facebook, instagram } = e.target;
    const new_data = {
      title: title.value,
      about: about.value,
      description: description.value,
      facebook: facebook.value,
      instagram: instagram.value,
    };
    try {
      const json_data = await (
        await fetch("/api/set-site-info", {
          method: "post",
          body: JSON.stringify(new_data),
        })
      ).json();
      alert("تم تحديث البيانات بنجاح");
    } catch (err) {
      alert("حدث خطئ");
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getSiteInfo();
  }, []);
  return (
    <div dir="rtl">
      {isLoading && <LoadingScreen />}
      <form className="space-y-4" onSubmit={(e) => submitForm(e)}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            إسم الموقع
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="silva store"
            required
            defaultValue={data.title}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            وصف الموقع
          </label>

          <input
            defaultValue={data.description}
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // placeholder="متجر متكامل و أمن يحتوي على العديد من المنتجات التي يمكنك طلبها الأن "
            required
          />
        </div>
        <div>
          <label
            htmlFor="about"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            حول الموقع (وصف أطول للموقع)
          </label>
          <textarea
            required
            id="about"
            defaultValue={data.about}
            cols="30"
            rows="5"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="facebook"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            رابط الصفحة على الفيسبوك
          </label>
          <input
            defaultValue={data.facebook}
            type="text"
            id="facebook"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="facebook page"
            required
          />
        </div>
        <div>
          <label
            htmlFor="instagram"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            رابط الانستغرام
          </label>
          <input
            defaultValue={data.instagram}
            type="text"
            id="instagram"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="instagram page"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default SiteOptions;
