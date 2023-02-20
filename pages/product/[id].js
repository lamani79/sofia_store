import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import MainNav from "../../components/nav";
import Nav from "../../components/nav";
import Image from "next/image";
import ShopForm from "../../components/shop-form";
import { useState } from "react";

const SingleProduct = ({ info, product }) => {
  // const router = useRouter();
  // const { id } = router.query;
  const [deliveryPrice, setDeliveryPrice] = useState("إختر الولاية ");

  return (
    <div className="bg-white">
      <MainNav info={info} />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-0 sm:py-4 md:py-8 mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="w-full">
              <Image
                width={1200}
                height={720}
                object-fit="cover"
                // sizes="fill"
                alt="ecommerce"
                className="rounded-lg"
                src={product.img}
              />
            </div>
            <div dir="rtl" className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <div className="">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {product.title}
                </h1>
                <span className="title-font font-bold text-4xl text-gray-900">
                  {product.price + "دج"}
                  {"+ " + deliveryPrice + "دج" + " ثمن التوصيل"}

                </span>
              </div>

              <ShopForm
                productId={product.id}
                setDeliveryPrice={setDeliveryPrice}
                productName={product.title}
              />

              <p className="leading-relaxed">{product.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// export async function getStaticPaths() {
  // ##############################################################
  //   // get all products ids
  // const products_ids = [];
  // const products_collection = collection(db, "products");
  // try {
  //   const snapshot = await getDocs(products_collection);
  //   snapshot.docs.forEach((doc) => {
  //     // products_ids.push({ id: doc.id });
  //     products_ids.push({ params: { id: doc.id } });
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  // ##############################################################
  // return {
  //   paths: [...products_ids],
  //   fallback: false, // can also be true or 'blocking'
  // };
// }

export async function getServerSideProps(context) {
  // get product info:
  let product_data = {};
  const docRef = doc(db, "/products", context.params.id);
  try {
    const snapshot = await getDoc(docRef);
    product_data = { ...snapshot.data(), id: snapshot.id };
  } catch (err) {
    console.log(err);
  }

  // ##############################################################
  // get site info
  const data_site_arr = [];
  const site_info_collection = collection(db, "/site-info");
  try {
    const snapshot = await getDocs(site_info_collection);
    snapshot.docs.forEach((doc) => data_site_arr.push({ ...doc.data() }));
  } catch (err) {
    console.log(err);
  }

  return {
    props: { 
      info: data_site_arr[0],
       product: product_data },
    // revalidate: 10, // In seconds
  };
}

export default SingleProduct;
