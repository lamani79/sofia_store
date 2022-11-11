import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="h-screen bg-white grid place-content-center">
      <section>
        <div className="container">
          <div className="content flex flex-col justify-center items-center space-y-4 px-2">
            <img src="/img/check-circle-Bold_1_.png" alt="success" />
            <h2 className="text-center text-4xl font-bold">تم إرسال طلبك</h2>
            <p className="text-center">لقد تم إرسال طلبك سوف نتصل بك خلال 24 ساعة القادمة لتأكيد طلبك</p>
            <Link href="/">
              <img src="/img/home-Bold_1_.png" alt="" />
              <span className="font-medium text-lg bg-black hover:bg-gray-900 transition-colors py-2 px-4 text-white rounded-md">العودة إلى المتجر</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessPage;
