import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { async } from "@firebase/util";
import MainNav from "../components/nav";

// import path from "path";
// import { promises as fs } from "fs";

export default function Home({ info, products }) {
  return (
    <main className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
      <MainNav info={info} />

      <mian dir="rtl">
        <section className="bg-white py-8">
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full z-30 top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span
                  className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                  href="#"
                >
                  تسوق الأن
                </span>

                {/* <div className="flex items-center" id="store-nav-content">
                  <a
                    className="pl-3 inline-block no-underline hover:text-black"
                    href="#"
                  >
                    <svg
                      className="fill-current hover:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                    </svg>
                  </a>

                  <a
                    className="pl-3 inline-block no-underline hover:text-black"
                    href="#"
                  >
                    <svg
                      className="fill-current hover:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                    </svg>
                  </a>
                </div> */}
              </div>
            </nav>

            {products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                >
                  <Link href={`product/${item.id}`}>
                    <img
                      className="hover:grow hover:shadow-lg"
                      src={item.img}
                    />
                    <div className="pt-3 flex items-center justify-between">
                      <p className="font-semibold text-xl text-center">
                        {item.title}
                      </p>
                    </div>
                    <p className="pt-1 text-gray-900 text-xl font-bold">
                      {item.price + "دج"}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container py-8 px-6 mx-auto">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
              href="#"
            >
              عن المتجر
            </a>

            <p className="mb-8">{info.about}</p>
          </div>
        </section>
      </mian>
      <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
        <div className="container flex px-3 py-8 ">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="flex w-full lg:w-1/2 ">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">وصف المتجر</h3>
                <p className="py-4">{info.description}</p>
              </div>
            </div>
            <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">تابعنا على </h3>
                <ul className="list-reset items-center pt-3 flex gap-2">
                  <li>
                    <a
                      className="inline-block no-underline hover:text-black hover:underline py-1"
                      href={info.facebook}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-facebook"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={info.instagram}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-instagram"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// export async function getServerSideProps(context) {

export async function getStaticProps(context) {
  // ##############################################################
  //   // get all products
  const data_product_arr = [];
  const products_collection = collection(db, "products");
  try {
    const snapshot = await getDocs(products_collection);
    snapshot.docs.forEach((doc) => {
      data_product_arr.push({ ...doc.data(), id: doc.id });
    });
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

  // const jsonDirectory = path.join(process.cwd(), "temp");
  // const site_info_location =
  // process.env.DEV == "yes" ? path.join(process.cwd(),'temp','site-info.json') : "/temp/site-info.json";
  // //Read the json data file data.json
  // const fileContents = JSON.parse(
  //   await fs.readFile(site_info_location, "utf8")
  // );
  return {
    props: { info: data_site_arr[0], products: data_product_arr },
    revalidate: 10, // In seconds
  };
}
