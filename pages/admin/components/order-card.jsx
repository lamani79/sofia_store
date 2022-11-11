const OrderCard = ({ info, closeCard }) => {
  const date = info?.date.toDate();
  const year = date?.getFullYear();
  const month = date?.getMonth() - 1;
  const day = date?.getDay();
  const hours = date?.getHours();

  const minutes = date?.getMinutes();

  const seconds = date?.getSeconds();
  const order_date = `${day}/${month}/${year} ----> ${hours}:${minutes}:${seconds} `;
  // const order_date = info.date.toDate().toString();

  return (
    <div
      dir="rtl"
      className="fixed z-[99] top-0 left-0 w-screen h-screen bg-black/80 grid place-content-center"
    >
      <div className="h-[90vh] w-[360px] sm:w-[550px] dark:bg-gray-800 rounded-lg px-4 py-2">
        <header className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-medium">معلومات الطلبية</h2>
          <svg
            onClick={() => closeCard()}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x cursor-pointer hover:stroke-gray-500"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </header>
        <ul className="mt-4 space-y-2" id="order-card-list-info">
          <li className="">
            <h3 className="">- إسم العميل :</h3>
            <p className="">{info?.fullName}</p>
          </li>
          <li>
            <h3 className="">- معرف العملية:</h3>
            <p className="">{info?.id}</p>
          </li>

          <li>
            <h3 className="">- إسم المنتج:</h3>
            <p className="">{info?.productName}</p>
          </li>
          <li>
            <h3 className="">- رقم الهاتف :</h3>
            <p className="">{info?.phone}</p>
          </li>
          <li>
            <h3 className="">- تاريخ العملية :</h3>
            <p className="">{order_date}</p>
          </li>
          <li>
            <h3 className="">- الولاية :</h3>
            <p className="">{info?.wilaya}</p>
          </li>
          <li>
            <h3 className="">- البلدية :</h3>
            <p className="">{info?.baladiya}</p>
          </li>
          <li>
            <h3 className="">- عدد الطلبيات :</h3>
            <p className="">{info?.quantity}</p>
          </li>
          <li>
            <h3 className="">- حالة الطلبية :</h3>
            <p className="">{info?.status}</p>
          </li>
          <li>
            <h3 className="">- معلومات إضافية</h3>
            <p className="">{info?.otherInfo}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
